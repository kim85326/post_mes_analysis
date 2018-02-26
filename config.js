//連接 Facebook JavaScript SDK
window.fbAsyncInit = function() {
  FB.init({
    appId      : '169353010331029', //更改你的應用程式編號
    cookie     : true,
    xfbml      : true,
    version    : 'v2.11' //更改你的SDK 版本
  });

  //每次載入頁面就去確認用戶的登入狀況
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));