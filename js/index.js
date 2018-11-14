// JavaScript Document


function tt(result,url){
  if(result == -1 || result == '-1'){  
    sq(url); 
  }
}
function isToken(url){
  var Request=new UrlSearch();
  if( (Request.is == '1' || Request.is == 1) && Request.token != null ){
      setCookie("token",Request.token);
      return;
  }else if(Request.is == '0' || Request.is == 0){
      setCookie("openId",Request.openid);
      setCookie("invite_code",Request.invite_code);
      window.location.href="register.html";
      return;
  }else if (Request.is == '2' || Request.is == 2) {
    alert('账号已经被冻结');
    return;
  };
  if(getCookie('token')=='' || getCookie('token')==undefined || getCookie('token')==null){
    // alert(0);
    sq(url);
    setCookie("invite_code",Request.invite_code);
  }
}
function isToken2(url){
  var Request=new UrlSearch();
  if( (Request.is == '1' || Request.is == 1) && Request.token != null ){
      setCookie("token",Request.token);
      return;
  }else if(Request.is == '0' || Request.is == 0){
      setCookie("openId",Request.openid);
      setCookie("invite_code",Request.invite_code);
      window.location.href="register.html";
  }else if (Request.is == '2' || Request.is == 2) {
    alert('账号已经被冻结');
    return;
  };
}

function isRegister(){
  var Request=new UrlSearch();
  setCookie("openId",Request.openid);
  setCookie("invite_code",Request.invite_code);
  console.log(getCookie("openId"),getCookie("invite_code"));
}

 function UrlSearch()
{
    var name,value;
    var str=location.href;  //取得整个地址栏
    var num=str.indexOf("?"); 
    str=str.substr(num+1); //str得到?之后的字符串

    var arr=str.split("&"); //得到&分割的参数，放入数组中
    for(var i=0;i<arr.length;i++)
    {
        num=arr[i].indexOf("=");
        if(num>0)
        {
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            this[name]=value;
        }
    }
}


function sgin_in(url){
  var Request=new UrlSearch();
  if(Request.is == '0' || Request.is == 0 ){
      console.log(1);
     setCookie("openId",Request.openid);
     window.location.href="register.html";
  }else{
    if(Request.token == null || Request.token == '' ||  Request.token == undefined  ){
      sq(url);
      setCookie("invite_code",Request.invite_code);
    }else{
       setCookie("token",Request.token);
    }
  }
}

function sq(url){
     window.location.href = "http://shandu.unohacha.com/Api/BaseH5/H5?h5_url="+encodeURIComponent(url);
}

function goOther(){

	$('#goOrder').click(function(){
		
	    if(getCookie('token')=='' || getCookie('token')==undefined || getCookie('token')==null){
	        sq('http://shandu.unohacha.com/wx_shandu/orderList.html');
	    }else{
	        window.location.href = "orderList.html";
	    }
		
	});
	$('#goUser').click(function(){

	    if(getCookie('token')=='' || getCookie('token')==undefined || getCookie('token')==null){
	        sq('http://shandu.unohacha.com/wx_shandu/user.html');
	    }else{
	        window.location.href = "user.html";
	    }
	    
	});

}

function isLogin(url,fn){
  if(getCookie('token')=='' || getCookie('token')==undefined || getCookie('token')==null){
    sgin_in(url);
  }else{
    fn && fn()
  }
}
// <script src="//res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
// function myShare(){

//   wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: '', // 必填，公众号的唯一标识
//     timestamp: , // 必填，生成签名的时间戳
//     nonceStr: '', // 必填，生成签名的随机串
//     signature: '',// 必填，签名
//     jsApiList: [] // 必填，需要使用的JS接口列表
//   });

// }



