//按下登入按鈕時，檢查登入狀態
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  //如果已經登入就把他帶到index.html
  if (response.status === 'connected') {
    //拿到用戶的token去跟fb要使用者資料
    get_profile();
    document.location.href="index.html";
  }
}

//透過token去跟fb要用戶資料
function get_profile() {
  FB.api('/me', {fields: 'name, id, gender, email'}, function(response) {
    console.log(response);
  });
}
