var cartHeader = Vue.extend({
		template:`
		<div class="footer">
  <ul class="clearfix">
    <a href="javascript:void(0);" @click="goTab(1,'index.html')">
	    <li :class="types==1?'on':''">
	    	<div class="footer_img footer_img1">
	      		<img src="images/ic_home_home_gray.png">
	      		<img src="images/ic_home_home_yellow.png">
	        </div>
	        <span>主页</span>	        
	    </li>
    </a>
    <a href="javascript:void(0);" @click="goTab(2,'stroy1.html')">
	    <li :class="types==2?'on':''">
	    	<div class="footer_img footer_img1">
	      		<img src="images/ic_home_yishu_gray.png">
	      		<img src="images/ic_home_yishu_yellow.png">
	        </div>
	        <span>老故事</span>
	        <span v-if="num.lgsnum && num.lgsnum!=0" class="navNum">{{num.lgsnum}}</span>
	    </li>
	</a>
	<a href="javascript:void(0);" @click="goTab1()">
	    <li>
	    	<div class="footer_img footer_img2">
	    	  	<img src="images/ic_dibutiao_shandu_gray.png">
	    	  	<img src="images/ic_dibutiao_shandu_yellow.png">
	    	</div>
		</li>
	</a>
	
	<a href="JavaScript:void(0);" @click="goTab(4,'orderList.html')">
	    <li :class="types==4?'on':''">
	    	<div class="footer_img footer_img1">
	      		<img src="images/ic_home_dingdan_gray.png">
	      		<img src="images/ic_home_dingdan_yellow.png">
	        </div>
	        <span>订单</span>
	        <span v-if="num.order_num && num.order_num!=0" class="navNum">{{num.order_num}}</span>
		</li>
    </a>
    
    <a href="JavaScript:void(0);" @click="goTab(5,'user.html')">
	    <li :class="types==5?'on':''">
	    	<div class="footer_img footer_img1">
	    	    <img src="images/ic_home_geren_gray.png">	
	    	    <img src="images/ic_home_geren_yellow.png">	
	    	</div>	
	        <span>我的</span>
	        <span v-if="num1.pingtai && num1.pingtai!=0" class="navNum">{{num1.pingtai}}</span>
	    </li>
    </a>
  </ul>
</div>`,

data (){
	return{
		types:1,
		num:'',
		num1:''
	}
},
props: {
    name: String //这样可以指定传入的类型，如果类型不对，会警告
},
created () {
	var $this=this;
	console.log(this.name);

	var url = location.href;
	console.log(url);
    isToken(url);

	if(sessionStorage.getItem("tabType")){
		$this.types=sessionStorage.getItem("tabType");
	}
	$this.getNum();
	$this.getNum1();
},
mounted:function(){

},
methods:{
	goTab:function(type,url){
		var $this=this;
		sessionStorage.setItem('tabType',type);
        window.location.href = url; 
	},
	goTab1:function(){
       alert('此功能正在开发中,敬请期待!');
	},
	getNum:function(){
		var $this = this;
        const data = {
            
        }
        // $this.$emit('name',88);
        Axios.post(window.Url.order_num,data).then((res) => {
        	// $this.$emit('dome',66);
          tt(res.result,'http://shandu.unohacha.com/wx_shandu/index.html');
          if(res.result == 1){
            $this.num=res.info;
            $this.$emit('dom', $this.num);
            // console.log($this.num);           
          }else if(res.result == 0){
            console.log("活力健身-相关推荐:"+res.info);
          }
          
        }).catch((err) => {
            console.log("活力健身-相关推荐:"+err)
        })
	},
	getNum1:function(){
		var $this = this;
        const data = {
            
        }
        Axios.post(window.Url.newsCount,data).then((res) => {

          tt(res.result,'http://shandu.unohacha.com/wx_shandu/index.html');
          if(res.result == 1){
            $this.num1=res.info;

            // $this.$emit('childByValue', $this.num);            
          }else if(res.result == 0){
            console.log("活力健身-相关推荐:"+res.info);
          }
          
        }).catch((err) => {
            console.log("活力健身-相关推荐:"+err)
        })
	},

}


})

Vue.component('footer1', cartHeader);