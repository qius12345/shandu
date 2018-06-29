/*全局变量*/
//接口地址
window.baseUrl="http://shandu.unohacha.com";

axios.defaults.baseUrl = "http://shandu.unohacha.com";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["content-Type"] = "appliction/x-www-form-urlencoded";



