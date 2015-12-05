<?php
namespace app\enroll;

include_once dirname(__FILE__) . '/base.php';
/**
 * 登记活动
 */
class record extends base {
	/**
	 * 解决跨域异步提交问题
	 */
	public function submitkeyGet_action() {
		/* support CORS */
		header('Access-Control-Allow-Origin:*');
		$key = md5(uniqid() . mt_rand());

		return new \ResponseData($key);
	}
	/**
	 * 报名登记页，记录登记信息
	 *
	 * @param string $mpid
	 * @param string $aid
	 * @param string $ek enrollKey 如果要更新之前已经提交的数据，需要指定
	 * @param string $submitkey 支持文件分段上传
	 */
	public function submit_action($mpid, $aid, $ek = null, $submitkey = '') {
		/* support CORS */
		header('Access-Control-Allow-Origin:*');
		header('Access-Control-Allow-Methods:POST');
		header('Access-Control-Allow-Headers:Content-Type');
		if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
			exit;
		}

		empty($mpid) && die('mpid is empty.');
		empty($aid) && die('aid is empty.');

		$model = $this->model('app\enroll');
		if (false === ($act = $model->byId($aid))) {
			die('活动不存在');
		}
		/**
		 * 当前访问用户的基本信息
		 */
		$user = $this->getUser($mpid,
			array(
				'authapis' => $act->authapis,
				'matter' => $act,
				'verbose' => array('member' => 'Y', 'fan' => 'Y'),
			)
		);
		/**
		 * 当前用户是否可以进行提交操作
		 */
		$this->checkActionRule($mpid, $act, $user);
		/**
		 * 处理提交数据
		 */
		$posted = $this->getPostJson();
		$mid = empty($user->membersInAcl) ? '' : $user->membersInAcl[0]->mid;
		/**
		 * 包含用户身份信息
		 */
		if (isset($posted->member) && isset($posted->member->authid)) {
			$member = clone $posted->member;
			$rst = $this->submitMember($mpid, $member, $user->fan->fid, $mid);
			if ($rst[0] === false) {
				return new \ParameterError($rst[1]);
			}
		}
		/**
		 * 处理提交数据
		 */
		if (empty($ek)) {
			/* 插入报名数据 */
			$ek = $model->enroll($mpid, $act, $user->openid, $user->vid, $mid);
			/* 处理自定义信息 */
			$rst = \TMS_APP::M('app\enroll\record')->setData($user, $mpid, $aid, $ek, $posted, $submitkey);
		} else {
			/* 已经登记，更新原先提交的数据 */
			$this->model()->update('xxt_enroll_record',
				array('enroll_at' => time()),
				"enroll_key='$ek'"
			);
			/* 重新插入新提交的数据 */
			$rst = \TMS_APP::M('app\enroll\record')->setData($user, $mpid, $aid, $ek, $posted, $submitkey);
		}
		if (false === $rst[0]) {
			return new \ResponseError($rst[1]);
		}
		/**
		 * 通知登记活动的管理员
		 */
		!empty($act->receiver_page) && $this->notifyAdmin($mpid, $act, $ek, $user);

		return new \ResponseData($ek);
	}
	/**
	 * 提交信息中包含的用户身份信息
	 */
	private function submitMember($mpid, $member, $fid) {
		/**
		 * 处理用户认证信息
		 */
		$authid = $member->authid;
		unset($member->authid);
		$memberModel = $this->model('user/member');

		if ($existentMember = $memberModel->byFanid($fid, 'mid', $authid)) {
			$rst = $memberModel->modify($mpid, $authid, $existentMember->mid, $member);
		} else {
			$rst = $memberModel->create2($mpid, $authid, $fid, $member);
		}
		$member->authid = $authid;

		return $rst;
	}
	/**
	 * 通知活动管理员
	 */
	private function notifyAdmin($mpid, $act, $ek, $user) {
		$admins = \TMS_APP::model('acl')->enrollReceivers($mpid, $act->id);
		if (false !== ($key = array_search($user->openid, $admins))) {
			/* 管理员是登记人，不再通知 */
			unset($admins[$key]);
		}

		if (!empty($admins)) {
			$url = 'http://' . $_SERVER['HTTP_HOST'] . "/rest/app/enroll?mpid=$mpid&aid=$act->id&ek=$ek&page=$act->receiver_page";
			$txt = urlencode("【" . $act->title . "】有新登记数据，");
			$txt .= "<a href=\"$url\">";
			$txt .= urlencode("请处理");
			$txt .= "</a>";
			$message = array(
				"msgtype" => "text",
				"text" => array(
					"content" => $txt,
				),
			);
			$mpa = $this->model('mp\mpaccount')->getApis($mpid);
			if ($mpa->mpsrc === 'qy') {
				$message['touser'] = implode('|', $admins);
				$this->send_to_qyuser($mpid, $message);
			} else if ($mpa->mpsrc === 'yx' && $mpa->yx_p2p === 'Y') {
				$this->send_to_yxuser_byp2p($mpid, $message, $admins);
			} else {
				foreach ($admins as $admin) {
					$this->sendByOpenid($mpid, $admin, $message);
				}
			}
		}

		return true;
	}
	/**
	 * 分段上传文件
	 */
	public function uploadFile_action($mpid, $aid, $submitkey = '') {
		/* support CORS */
		header('Access-Control-Allow-Origin:*');
		header('Access-Control-Allow-Methods:POST');
		if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
			exit;
		}

		if (empty($submitkey)) {
			$user = $this->getUser($mpid);
			$submitkey = $user->vid;
		}
		/**
		 * 分块上传文件
		 */
		$modelFs = \TMS_APP::M('fs/local', $mpid, '_resumable');
		$dest = $submitkey . '_' . $_POST['resumableIdentifier'];
		$resumable = \TMS_APP::M('fs/resumable', $mpid, $dest, $modelFs);
		$resumable->handleRequest($_POST);

		return new \ResponseData('ok');
	}
	/**
	 * 给当前用户产生一条空的登记记录，记录传递的数据，并返回这条记录
	 * 适用于抽奖后记录兑奖信息
	 *
	 * @param string $mpid
	 * @param string $aid
	 * @param string $once 如果已经有登记记录，不生成新的登记记录
	 */
	public function emptyGet_action($mpid, $aid, $once = 'N') {
		$posted = $this->getPostJson();

		$model = $this->model('app\enroll');
		if (false === ($act = $model->byId($aid))) {
			return new \ParameterError("指定的活动（$aid）不存在");
		}
		/**
		 * 当前访问用户的基本信息
		 */
		$user = $this->getUser($mpid,
			array(
				'authapis' => $act->authapis,
				'matter' => $act,
				'verbose' => array('member' => 'Y', 'fan' => 'Y'),
			)
		);
		/* 如果已经有登记记录则不登记 */
		$modelRec = $this->model('app\enroll\record');
		if ($once === 'Y') {
			$ek = $modelRec->getLastKey($mpid, $aid, $user->openid);
		}
		/* 创建登记记录*/
		if (empty($ek)) {
			$ek = $modelRec->add($mpid, $act, $user, (empty($posted->referrer) ? '' : $posted->referrer));
			/**
			 * 处理提交数据
			 */
			$data = $_GET;
			unset($data['mpid']);
			unset($data['aid']);
			if (!empty($data)) {
				$data = (object) $data;
				$rst = $modelRec->setData($user, $mpid, $aid, $ek, $data);
				if (false === $rst[0]) {
					return new ResponseError($rst[1]);
				}
			}
		}
		/*登记记录的URL*/
		$url = '/rest/app/enroll';
		$url .= '?mpid=' . $mpid;
		$url .= '&aid=' . $aid;
		$url .= '&ek=' . $ek;

		$rsp = new \stdClass;
		$rsp->url = $url;
		$rsp->ek = $ek;

		return new \ResponseData($rsp);
	}
	/**
	 * 发出邀请
	 *
	 * @param string $mpid
	 * @param string $aid
	 * @param string $invitee
	 * @param string $page
	 */
	public function inviteSend_action($mpid, $aid, $ek, $invitee, $page = '') {
		/*获得被邀请人的信息*/
		$options = array('fields' => 'openid');
		$members = $this->model('user/member')->search($mpid, $invitee, $options);
		if (empty($members)) {
			return new \ResponseError("指定的用户不存在");
		}
		$openid = $members[0]->openid;

		/*给邀请人发消息*/
		$message = \TMS_APP::M('matter\enroll')->forCustomPush($mpid, $aid);
		$url = $message['news']['articles'][0]['url'];
		$url .= "&ek=$ek";
		!empty($page) && $url .= "&page=$page";
		$message['news']['articles'][0]['url'] = $url;
		$rst = $this->sendByOpenid($mpid, $openid, $message);
		if ($rst[0] === false) {
			return new \ResponseError($rst[1]);
		}

		return new \ResponseData($members);
	}
	/**
	 * 记录参加登记活动的用户之间的邀请关系
	 * 邀请必须依赖于某条已经存在的登记记录
	 *
	 * $param inviter enroll_key
	 */
	public function acceptInvite_action($mpid, $aid, $inviter, $state = '1') {
		$model = $this->model('app\enroll');
		if (false === ($app = $model->byId($aid))) {
			return new \ParameterError("指定的活动（$aid）不存在");
		}
		/* 当前访问用户的基本信息 */
		$user = $this->getUser($mpid,
			array(
				'authapis' => $app->authapis,
				'matter' => $app,
				'verbose' => array('member' => 'Y', 'fan' => 'Y'),
			)
		);
		/* 如果已经有登记记录则不登记 */
		$modelRec = $this->model('app\enroll\record');
		if ($state === '1') {
			$ek = $modelRec->getLastKey($mpid, $aid, $user->openid);
			if (!empty($ek)) {
				$rsp = new \stdClass;
				$rsp->ek = $ek;
				return new \ResponseData($rsp);
			}
		} else {
			$ek = $modelRec->hasAcceptedInvite($aid, $user->openid, $inviter);
		}
		if (false === $ek) {
			/* 创建登记记录*/
			$ek = $modelRec->add($mpid, $app, $user, 'ek:' . $inviter);
			if ($state !== '1') {
				/*不作为独立的记录，只是接收邀请的日志*/
				$modelRec->modify($ek, array('state' => 2));
			}
			/** 处理提交数据 */
			$data = $_GET;
			unset($data['mpid']);
			unset($data['aid']);
			if (!empty($data)) {
				$data = (object) $data;
				$rst = $modelRec->setData($user, $mpid, $aid, $ek, $data);
				if (false === $rst[0]) {
					return new ResponseError($rst[1]);
				}
			}
			/* 记录邀请数 */
			$this->model()->update("update xxt_enroll_record set follower_num=follower_num+1 where enroll_key='$inviter'");
		}
		$rsp = new \stdClass;
		$rsp->ek = $ek;

		return new \ResponseData($rsp);
	}
	/**
	 * 返回指定记录或最后一条记录
	 * @param string $mpid
	 * @param string $aid
	 * @param string $ek
	 */
	public function get_action($mpid, $aid, $ek = '') {
		$modelApp = $this->model('app\enroll');
		$modelRec = $this->model('app\enroll\record');
		$openedek = $ek;
		$record = null;
		$options = array('cascaded' => 'N');
		$app = $modelApp->byId($aid, $options);
		/*当前访问用户的基本信息*/
		$user = $this->getUser($mpid,
			array(
				'authapis' => $app->authapis,
				'matter' => $app,
				'verbose' => array('member' => 'Y', 'fan' => 'Y'),
			)
		);
		/**登记数据*/
		if (empty($openedek)) {
			/*获得最后一条登记数据。登记记录有可能未进行过登记*/
			$options = array(
				'fields' => '*',
			);
			$record = $modelRec->getLast($mpid, $aid, $user->openid, $options);
			if ($record) {
				$openedek = $record->enroll_key;
				if ($record->enroll_at) {
					$record->data = $modelRec->dataById($openedek);
				}
			}
		} else {
			/*打开指定的登记记录*/
			$record = $modelRec->byId($openedek);
		}
		/**互动数据*/
		if (!empty($openedek)) {
			/*登记人信息*/
			if (!empty($record->openid)) {
				$options = array(
					'openid' => $record->openid,
					'verbose' => array('fan' => 'Y', 'member' => 'Y'),
				);
				$record->enroller = $this->getUser($mpid, $options);
			} else {
				$record->enroller = $user;
			}
			/*评论数据*/
			if ($app->can_remark_record === 'Y') {
				$record->remarks = $modelRec->remarks($openedek);
			}
			/*获得关联抽奖活动记录*/
			$ql = array(
				'award_title',
				'xxt_lottery_log',
				"enroll_key='$openedek'",
			);
			$lotteryResult = $this->model()->query_objs_ss($ql);
			if (!empty($lotteryResult)) {
				$lrs = array();
				foreach ($lotteryResult as $lr) {
					$lrs[] = $lr->award_title;
				}
				$record->data['lotteryResult'] = implode(',', $lrs);
			}
		}

		return new \ResponseData($record);
	}
	/**
	 * 列出所有的登记记录
	 *
	 * $mpid
	 * $aid
	 * $orderby time|remark|score|follower
	 * $openid
	 * $page
	 * $size
	 *
	 * return
	 * [0] 数据列表
	 * [1] 数据总条数
	 * [2] 数据项的定义
	 *
	 */
	public function list_action($mpid, $aid, $owner = 'U', $rid = '', $orderby = 'time', $openid = null, $page = 1, $size = 30) {
		$user = $this->getUser($mpid);
		switch ($owner) {
		case 'U':
			$options = array(
				'creater' => $user->openid,
				'visitor' => $user->openid,
			);
			break;
		case 'I':
			$options = array(
				'inviter' => $user->openid,
			);
			break;
		default:
			$options = array(
				'creater' => $openid,
				'visitor' => $user->openid,
			);
			break;
		}
		$options['rid'] = $rid;
		$options['page'] = $page;
		$options['size'] = $size;
		$options['orderby'] = $orderby;

		$modelRec = $this->model('app\enroll\record');
		$rst = $modelRec->find($mpid, $aid, $options);

		return new \ResponseData($rst);
	}
	/**
	 * 登记记录点赞
	 *
	 * $mpid
	 * $ek
	 */
	public function score_action($mpid, $ek) {
		/** 当前用户 */
		$user = $this->getUser($mpid);
		$openid = $user->openid;

		$modelRec = $this->model('app\enroll\record');
		if ($modelRec->hasScored($openid, $ek)) {
			/**
			 * 点过赞，再次点击，取消赞
			 */
			$this->model()->delete(
				'xxt_enroll_record_score',
				"enroll_key='$ek' and openid='$openid'"
			);
			$myScore = 0;
		} else {
			/**
			 * 点赞
			 */
			$i = array(
				'openid' => $openid,
				'enroll_key' => $ek,
				'create_at' => time(),
				'score' => 1,
			);
			$this->model()->insert('xxt_enroll_record_score', $i, false);
			$myScore = 1;
		}
		/**
		 * 获得点赞的总数
		 */
		$score = $modelRec->score($ek);
		$this->model()->update('xxt_enroll_record', array('score' => $score), "enroll_key='$ek'");

		return new \ResponseData(array('myScore' => $myScore, 'score' => $score));
	}
	/**
	 * 针对登记记录发表评论
	 *
	 * $mpid
	 * $ek
	 */
	public function remark_action($mpid, $ek) {
		$data = $this->getPostJson();
		if (empty($data->remark)) {
			return new \ResponseError('评论不允许为空！');
		}

		$modelEnroll = $this->model('app\enroll');
		/**
		 * 当前活动
		 */
		$q = array('aid,openid', 'xxt_enroll_record', "enroll_key='$ek'");
		$record = $this->model()->query_obj_ss($q);
		$aid = $record->aid;
		$act = $modelEnroll->byId($aid);
		/**
		 * 发表评论的用户
		 */
		$user = $this->getUser($mpid);
		if (empty($user->openid)) {
			return new \ResponseError('无法获得用户身份标识');
		}

		$remark = array(
			'openid' => $user->openid,
			'enroll_key' => $ek,
			'create_at' => time(),
			'remark' => $this->model()->escape($data->remark),
		);
		$remark['id'] = $this->model()->insert('xxt_enroll_record_remark', $remark, true);
		$remark['nickname'] = $user->nickname;
		$this->model()->update("update xxt_enroll_record set remark_num=remark_num+1 where enroll_key='$ek'");
		/**
		 * 通知登记人有评论
		 */
		if ($act->remark_notice === 'Y' && !empty($act->remark_notice_page)) {
			$apis = $this->model('mp\mpaccount')->getApis($mpid);
			if ($apis && $apis->{$apis->mpsrc . '_custom_push'} === 'Y') {
				/**
				 * 发送评论提醒
				 */
				$url = 'http://' . $_SERVER['HTTP_HOST'] . "/rest/app/enroll?mpid=$mpid&aid=$aid&ek=$ek&page=$act->remark_notice_page";
				$text = urlencode($remark['nickname'] . '对【');
				$text .= '<a href="' . $url . '">';
				$text .= urlencode($act->title);
				$text .= '</a>';
				$text .= urlencode('】发表了评论：' . $remark['remark']);
				$message = array(
					"msgtype" => "text",
					"text" => array(
						"content" => $text,
					),
				);
				/**
				 * 通知登记人
				 */
				if ($this->model('log')->canReceivePush($mpid, $record->openid)) {
					if ($record->openid !== $user->openid) {
						$this->send_to_user($mpid, $record->openid, $message);
					}
				}
				/**
				 * 通知其他发表了评论的用户
				 */
				$modelRec = $this->model('app\enroll\record');
				$others = $modelRec->remarkers($ek);
				foreach ($others as $other) {
					if ($other->openid === $record->openid || $other->openid === $remarker->openid) {
						continue;
					}
					$this->send_to_user($mpid, $other->openid, $message);
				}
			}
		}

		return new \ResponseData($remark);
	}
}