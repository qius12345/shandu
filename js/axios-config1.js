
(function(){
	var CancelToken = window.axios.CancelToken;
	window.cancelApi = null;
	var ERR_OK = 0;
	var LOGIN_TIME_OUT = 99;
	var INFO_EMPTY = 4;
	var CANCEL = -99;
	
	var Axios = window.axios.create({
		
		//baseURL: 'http://shandu.unohacha.com', // 反向代理
		baseURL: 'http://127.0.0.1:3000', // 反向代理
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
		//登录
		user_login:'/Api/User/login',

		//团购列表-全部商品
		goods_list:'/Api/Tuan/goodsList',

		//团购列表-指定商品
		//goodsid（指定商品的ID）
		goods_info:'/Api/Tuan/goodsInfo'
	}
	//用户信息
	window.userInfo = {
		token:'',
		mobile:'',
		audit:'',
		forbidden:'',
		type:''
	}
})();

