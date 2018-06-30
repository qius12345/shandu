
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
			 if (localStorage.token) {
			   //config.headers.Authorization = localStorage.token;
			 }
			
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
			console.log(error)
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
		//热门城市
		hot_city:'/Api/HotCity/hotcityIndex',
		//老故事类型
		stroy_cate:'/Api/Oldstory/cate',
		//老故事规则
		stroy_rules:'/Api/Oldstory/activity_url',
		//老故事排名
		stroy_ranking:'/Api/Oldstory/activity',
		//获取最佳人气接口
		stroy_best:'/Api/Oldstory/best',
		//获取热门故事接口
		stroy_hot:'/Api/Oldstory/hot',
		//获取全部故事接口
		stroy_all:'/Api/Oldstory/all',
		//获取热门故事列表接口
		stroy_hotList:'/Api/Oldstory/hot_list',
		//获取全部故事列表接口
		stroy_allList:'/Api/Oldstory/all_list',
		//获取老故事详情接口
		stroy_details:'/Api/Oldstory/details',
		//大舞台 的标题
		three_activities:'/Api/Stage/reveal',
		//大舞台 下的三个活动
		three_activities_lists:'/Api/Oldstory/video',
		//活动历史
		activities_history_list:'/Api/Stage/history_list',
		//活动规则
		activityRules:'/Api/Stage/rule',
		//活动视频
		activityVideo:'/Api/Stage/month',
		//排名
		activityRanking:'/Api/Stage/ranking',
		//投票
		activityvote:'/Api/Stage/vote',
	}
	
})();

