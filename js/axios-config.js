
(function(){
	var CancelToken = window.axios.CancelToken;
	window.cancelApi = null;
	var ERR_OK = 0;
	var LOGIN_TIME_OUT = 99;
	var INFO_EMPTY = 4;
	var CANCEL = -99;
	
	var Axios = window.axios.create({
		
		// baseURL: 'http://shandu.unohacha.com', // 反向代理
		baseURL: 'http://shandu.unohacha.com', // 反向代理
		timeout: 20000,
		responseType: 'json',
		withCredentials: true, // 是否允许带cookie这些
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		}
		
	});
	
	
	
	//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
	
	
	Axios.interceptors.request.use(
		function(config) {
			
            if (getCookie("token")) {
            	
			   config.data.token = getCookie("token");
			   
			 }
            
			config.cancelToken = new CancelToken(function executor(c) {
				// executor 函数接收一个 cancel 函数作为参数
				window.cancelApi = c;
			});
			
			// 在发送请求之前做某件事
			if (
				config.method === 'post' ||
				config.method === 'put' ||
				config.method === 'delete'
			) {
				// 序列化
				if (config.headers['Content-Type'] !== 'multipart/form-data') {
					var data = '';
					if(config.data && config.data!=={}){
						for(var key in config.data){
							data += encodeURIComponent(key) + '=' + encodeURIComponent(config.data[key]) + '&';	
						}
						config.data = data.substr(0,data.length-1);
					}else{
						config.data = '';
					}
				}
			}
			// 若是有做鉴权token , 就给头部带上token
			 
			
			return config;			
		},
		function(error){
			console.log(error)
			return Promise.reject(error.data.error.message);
		}
	);

	// 返回状态判断(添加响应拦截器)
	Axios.interceptors.response.use(
		
		function(res){
			
			// 对响应数据做些事
			if (res.data) {
				//return Promise.reject(res.data);
			}

			return res.data;
		},
		function(error){
			
			if(error.message == CANCEL){
				return Promise.reject();
			}
            
			return Promise.reject(error);
		}
	);
		
	window.Axios = Axios;
	
	//URL地址设置
	window.Url = {
		//首页BANNER
		home_banner:'/Api/Banner/banner',
		//首页长寿秘籍消息下标
		//token （登录状态）
		order_num:'/Api/Ucenter/order_num',

		//活力健身 为你推荐、更多
		//city:（当前城市）
		//type：（活力健身类型）
		energetic_fitness:'/Api/Vitality/fitness',
		//行程介绍 为你推荐、更多
		//tourist_id:（活力健身详情id）
		energetic_fitnessDetail:'/Api/Vitality/fitness_details',
		//预约服务
	    //token （登录状态）
	    //tourist_id（活力健身详情id）
	    //num （参与人数）
	    //name（姓名）
	    //handler（开始日期）
	    //telephone（电话）
	    //remark（备注）
	    vitality_order:'/Api/Order/Vitality_order',
		
		//今日数据
		//token（登录状态）
		Cheats_today:'/Api/Cheats/today',
		//咨询分类
		Cheats_cate:'/Api/Cheats/cate',
		//咨询分类列表
		//cate_id （分类ID）
		Cheats_cate_list:'/Api/Cheats/cheats_list',
		//咨询分类列表详情
		//cheats_id （列表每个信息的ID）
		Cheats_cate_details:'/Api/Cheats/details',
		//评论列表
		//token（登录状态）
		//cheats_id （秘籍id）
		Cheats_evaluate_list:'/Api/Cheats/evaluate_list',
		//发布评论
		//token（登录状态）
		//cheats_id （当前评论id）
		//comment （评论内容）
		Cheats_evaluate_publish:'/Api/Cheats/evaluate',
		//评论详情
		//token（登录状态）
		//evaluate_id （咨询分类id）
		Cheats_evaluate_details:'/Api/Cheats/evaluate_details',
		//回复评论详情
		//token（登录状态）
		//evaluate_id （评论id（后台传过来））
		//comment （回复内容）
		Cheats_evaluate_reply:'/Api/Cheats/evaluate_reply',
		//评论收藏/取消收藏
		//token（登录状态）
		//cheats_id （当前评论id）
		Cheats_evaluate_collect:'/Api/Cheats/collect',
		//点赞
		//token（登录状态）
		//evaluate_id（当前评论的id，后台传过来）
		Cheats_evaluate_zan:'/Api/Cheats/evaluate_zan',
		//阅读人数
		//token（登录状态）
		//evaluate_id（当前评论的id，后台传过来）
		Cheats_evaluate_pageview:'/Api/Cheats/evaluate_pageview',
		
		//服务分类
		//city（城市）
		//type_id （二级类型的type_id）
		//Is_company （1.商家 2个人）
		service_type:'/Api/Service/type',
		//服务列表
		//city（城市）
		//type_id （二级类型的type_id）
		//Is_company （1.商家 2个人）
		service_list:'/Api/Service/service_list',
		//获取城市对应区
		//city（城市）
		service_province:'/Api/Service/province',
		//服务详情
		//service_id （当前服务的id）
		service_details:'/Api/Service/service_details',
		//判断能否预约
		//token（登录状态）
		//service_id （当前服务的id）
		service_is_subscribe:'/Api/Service/is_subscribe',
		//提交预约订单
		//service_id （当前服务的id）
		service_order:'/Api/Order/service_order',

		//取消预约订单
		//token（登录状态）
		//serviceorderid （当前服务订单的id）
		service_cancel:'/Api/ServiceOrder/cancel',
		//预约订单开始工作
		//token（登录状态）
		//serviceorderid （当前服务订单的id）
		service_startWork:'/Api/ServiceOrder/startWork',
		//预约订单申请退款
		//token（登录状态）
		//serviceorderid （当前服务订单的id）
		service_applyRefund:'/Api/ServiceOrder/applyRefunds',
		//预约订单结束工作
		//token（登录状态）
		//serviceorderid （当前服务订单的id）
		//append_money （尾款 默认0）
		service_endWork:'/Api/ServiceOrder/endWork',
		//评价预约订单
		//token（登录状态）
		//serviceorderid （当前服务订单的id）
		//attitude （3  服务态度,星星数）
		//integrity （2  诚信守时,星星数）
		//assess （5	成果验收,星星数）
		//assess_text （评价内容,今天你做的很好的）
		//pic （建议,反馈图片(最多6张),文件类型）		
		service_pingJia:'/Api/ServiceOrder/pingJia',
		//预约订单退款投诉原因列表	
		//token（登录状态）	
		service_complain:'/Api/serviceOrder/complain',
		//预约订单退款投诉提交
		//token（登录状态）
		//service_order_id （当前服务订单的id）
		//complain_id （投诉原因id）
		//content （详细说明）		
		service_report:'/Api/serviceOrder/report',
		
		
		
		
		//热门城市
		hot_city:'/Api/HotCity/hotcityIndex',
		//老故事类型
		stroy_cate:'/Api/Oldstory/cate',
		//老故事规则
		stroy_rules:'/Api/Oldstory/activity_url',
		//老故事排名
		stroy_ranking:'/Api/Oldstory/activity',
		//获取最佳人气接口
		//city : （当前选中城市名）
        //cate_id: （老故事分类id）
		stroy_best:'/Api/Oldstory/best',
		//获取热门故事接口
		//city : （当前选中城市名）
        //cate_id: （老故事分类id）
		stroy_hot:'/Api/Oldstory/hot',
		//获取全部故事接口
		//city : （当前选中城市名）
        //cate_id: （老故事分类id）
		stroy_all:'/Api/Oldstory/all',
		//获取热门故事列表接口
		//city : （当前选中城市名）
        //cate_id: （老故事分类id）
		stroy_hotList:'/Api/Oldstory/hot_list',
		//获取全部故事列表接口
		//city : （当前选中城市名）
        //cate_id: （老故事分类id）
		stroy_allList:'/Api/Oldstory/all_list',
		//获取老故事详情接口
        //oldstory_id: （老故事详情id）
		stroy_details:'/Api/Oldstory/details',
		//老故事支持
		//oldstory_id （老故事详情ID）
		//token（登录状态）
		stroy_popularity:'/Api/Oldstory/popularity',
		//老故事搜索
		//search （搜索的关键字）
		stroy_searchList:'/Api/Oldstory/search',
		//老故事发布
		//token （登录状态）
		//cate_id （老故事分类id）
		//city （当前选中城市名）
		//title （故事标题）
		//collect （故事内容）
		//file （上传图片）
		stroy_issue:'/Api/Oldstory/issue',
		
		
		/*大舞台*/
		//大舞台 的标题
		//city : 城市 （发送首页选择的城市）
		three_activities:'/Api/Stage/reveal',
		//大舞台 下的三个活动
		//city : 城市 （发送首页选择的城市）
		three_activities_lists:'/Api/Oldstory/video',
		//活动历史
		//city : 城市 （发送首页选择的城市）
		activities_history_list:'/Api/Stage/history_list',
		//活动规则
		//stage_deploy_id ：id (当前活动ID)
		activityRules:'/Api/Stage/rule',
		//活动视频
		//stage_deploy_id ：id (当前活动ID)
		activityVideo:'/Api/Stage/month',
		//排名
		//stage_deploy_id ：id (当前活动ID)
		activityRanking:'/Api/Stage/ranking',
		//投票
		//token（登录状态）
		//stage_id（当前投票的ID）
		activityvote:'/Api/Stage/vote',

		//团购列表-全部商品
		goods_list:'/Api/Tuan/goodsList',
		//团购列表-指定商品
		//goodsid（指定商品的ID）
		goods_info:'/Api/Tuan/goodsInfo',
		//团购订单列表
        //token（登录状态）
		//type  {1全部,2待付款,3代发货,4待收货,5待评价,6已完成,7申请退款中,8退款完成关闭,9退款售后,10待拼团}
		TuanOrder_list:'/Api/TuanMyorder/index',
		//团购确认订单页
		//token（登录状态）
		//nums（够买数量）
		//skulistid（产品选择参数的sku_id）
		TuanOrder_sure:'/Api/TuanOrder/index',
		//团购生成订单页
		//token（登录状态）
		//nums（够买数量）
		//skulistid（产品选择参数的sku_id）
		//addressid（选中的地址id）
		//couponlistid（选择的优惠券id）
		//remark（用户留言 可选）
		tuanOrderSave:'/Api/TuanOrder/tuanOrderSave',
		//团购订单余额支付
		//token（登录状态）
		//orderno（订单号）
		//type（1团购订单,2充值,3服务订单,4活力健身,5服务追加赏金）
		tuanOrder_alipay:'/Api/BalancePay/alipay',

		//取消团购订单
		//token（登录状态）
		//orderid（订单id）
		tuanOrderCancel:'/Api/TuanOrder/tuanOrderCancel',
		//团购订单申请退款
		//token（登录状态）
		//orderid（订单id）
		tuanOrderApplyRefunds:'/Api/TuanOrder/tuanOrderApplyRefunds',
		//团购订单查看物流
		//token（登录状态）
		//orderid（订单id）
		tuanOrderLogistics:'/Api/TuanOrder/tuanOrderLogistics',
		//团购订单确认收货
		//token（登录状态）
		//orderid（订单id）
		tuanOrderReceived:'/Api/TuanOrder/tuanOrderReceived',
		//团购订单申请退款信息
		//token（登录状态）
		//orderid（订单id）
		orderDetails:'/Api/TuanMyorder/orderDetails',
		
		
		
		/*活力健身订单*/
		//token（登录状态）
		Vitality_order_list:'/Api/Vitality/order_list',
		/*活力健身订单统计*/
		//token（登录状态）
		Vitality_order_num:'/Api/Vitality/index',
		//取消活力健身订单
		//token（登录状态）
		//order_id（订单id）
		VitalityCancel:'/Api/Vitality/cancel',
		//活力健身订单申请退款
		//token（登录状态）
		//order_id（订单id）
		VitalityRefunds:'/Api/Vitality/refund',
		
		/*购买商品订单*/
		//token（登录状态）
		Service_order_num:'/Api/Service/index',

		/*微信支付订单*/
		//token（登录状态）
		//is_wxin（1 是否微信支付）
		//orderno（活力订单号）
		//type（订单类型）
		order_WeixinPay:'/Api/WeixinPay/pay',
		
		
		/*预约服务订单*/
		//token（登录状态）
		tugou_order_num:'/Api/TuanMyorder/countorder',
		
		
		/*购买商品订单列表*/
		//token（登录状态）
		//type  {1全部,2待付款,3代发货,4待收货,5待评价,6已完成,7申请退款中,8退款完成关闭,9退款售后,10待拼团}
		TuanMyorder_list:'/Api/TuanMyorder/index',
		
		/*预约订单列表*/
		//token（登录状态）
		//type//1更多全部,2待付款,3待确认,4进行中,5待评价,6已完成,7退款售后
		ServiceOrder_list:'/Api/ServiceOrder/index',
		
		
		
		
		/*我的*/
		//地址列表
		//token（登录状态）
		address_list:'/Api/address/index',
		//设置默认地址
		//token（登录状态）
		//addressid（地址ID）
		isdefaultset:'/Api/address/isdefaultset',
		//增加、修改地址
		//token（登录状态）
		//addressid（地址ID）
		addandedit:'/Api/address/addandedit',
		//修改地址（获取详情）
		//token（登录状态）
		//addressid（地址ID）
		edit_details:'/Api/Address/info',
		//删除地址
		//token（登录状态）
		//addressid（地址ID）
		delete_ress:'/Api/address/del',
		
		
		//个人收藏
		//token（登录状态）
		Ucenter_collect:'/Api/Ucenter/collect',
		
		//我的故事
		//token（登录状态）
		Ucenter_my_story:'/Api/Ucenter/my_story',
		
		
		//平台消息
		//token（登录状态）
		Ucenter_messaging:'/Api/Ucenter/messaging',
		//平台消息 未读消息数量
		//token（登录状态）
		newsCount:'/Api/Ucenter/newsCount',
		//平台消息删除
		//token（登录状态）
		//message_ids = messageid-type,messageid-type（消息id-消息类型，消息id-消息类型）
		message_delall:'/Api/Ucenter/message_delall',
		
		//意见反馈
		//token（登录状态）
		//opinion（输入的值）
		feedback:'/Api/Ucenter/feedback',
		
		
		//获取钱包余额
		//token（登录状态）
		Ucenter_wallet:'/Api/ucenter/wallet',
		//我的优惠券
		//token（登录状态）
		//type  1未使用,2过期,3已使用
		coupon:'/Api/coupon/index',
		//消费明细
		//token（登录状态）
		Money_details:'/Api/Money/index',
		//支付宝账号信息列表
		//token（登录状态）
		alipayList:'/Api/Ucenter/alipayList',
		//支付宝账号添加
		//token（登录状态）
		//account（支付宝账号）
		//name（名称）
		alipayAdd:'/Api/Ucenter/alipayAdd',
		//支付宝账号删除
		//token（登录状态）
		//alipay_id（支付宝账号id）
		alipayDel:'/Api/Ucenter/alipayDel',
		//支付宝提现信息
		//token（登录状态）
		getCashInfo:'/Api/Ucenter/getCashInfo',
		//支付宝提现
		//token（登录状态）
		cashMoney:'/Api/Ucenter/cashMoney',
		
		//获取版本号
		//token（登录状态）
		//price（提现金额）
		//bank_id（银行卡id）
		//alipay_id（支付宝账号id）
		//type（1-银行卡提现 2-支付宝提现）
		Ucenter_versions:'/Api/Ucenter/versions',
		
		//签到列表
		//token（登录状态）
		qiandao_index:'/Api/qiandao/index',
		//签到
		//token（登录状态）
		addqiandao:'/Api/qiandao/addqiandao',
		
		//帮助中心
		Ucenter_help:'/Api/Ucenter/help',

		//获取验证码
		send_code:'/Api/BaseH5/send_code',

		//绑定
		user_bound:'/Api/BaseH5/bound',

		//注册
		user_sign:'/Api/BaseH5/sign_in',

		//修改手机号码
		user_exchange:'/Api/BaseH5/exchange',

		//获取用户头像和昵称等信息
		user_info:'/Api/BaseH5/userInfo',

		//加入购物车
		//token（登录状态）
		//goodsId（商品id）
		//skulistid（商品sku id）
		//nums（加入购物车的数量）
		addToCart:'/Api/TuanCart/addToCart',
		//购物车列表 
		//token（登录状态）
		cartList:'/Api/TuanCart/index',
		//改变购物车商品数量
		//token（登录状态）
		//cartId（购物车id）
		//nums（加入购物车的数量）
		changeNumCart:'/Api/TuanCart/changeNumCart',
		//删除购物车
		//token（登录状态）
		//cartId（购物车id）
		delCart:'/Api/TuanCart/delCart',

		//获取微信SDK配置
		user_share:'/Api/BaseShare/WShareDeploy_url'
	}
	//用户信息
	window.userInfo = {
		token:'',
		mobile:'',
		audit:'',
		forbidden:'',
		type:''
	}

	//微信支付信息
    window.wxinPay = {
        appId:'',
        timeStamp:'',
        nonceStr:'',
        package:'',
        signType:'',
        paySign:'',
        error_url:'',
        success_url:''
    }
})();

