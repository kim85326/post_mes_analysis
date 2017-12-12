$(document).ready(function() {

    $("#search").click(function() {
        $("#result").hide();

        if ($("#post_id").val() != "") {
            $("#comments > tbody").html("");
            //拿使用者的token去跟fb要id
            FB.api('/me', { fields: 'posts' }, function(response) {
                var post_id_prefix = response.id;
                console.log('前面');
                console.log(post_id_prefix);
                console.log('後面');
                var post_id = $("#post_id").val();
                console.log(post_id);
                post_id = post_id_prefix + '_' + post_id;
                console.log('真正的');
                console.log(post_id);
                //拿真正的post_id去跟fb要 訊息、留言
                FB.api(`/${post_id}`, { fields: 'message , comments' }, function(response) {
                    if (response && !response.error) {
                        console.log(response);
                        $("#post_mes").html(response.message);
                        var comments = response.comments.data;
                        $.each(comments, function(key, value) {
                            // console.log(key + ": " + value.from.id);
                            // console.log(key + ": " + value.from.name);
                            // console.log(key + ": " + value.message);
                            var keyword = $("#keyword").val();
                            //把留言的message跟使用者輸入的關鍵字做比對，相同才會做事
                            if (value.message.search(keyword) != -1) {
                                var result = `<tr>
                                          <th class="comment_key" scope="row">${key}</th>
                                          <td class="comment_name"><a href="https://www.facebook.com/${value.from.id}" target="_blank">${value.from.name}</a></td>
                                          <td class="comment_mes">${value.message}</td>
                                      </tr>`;
                                $("#comments > tbody").append(result);
                            }
                            if ($("#comments > tbody").html() == "") {
                                $("#comments > tbody").html("找不到相關訊息");
                            }
                            $("#result").show();
                        });
                    }else{
                        //bug還沒修好啊！
                        console.log(response);
                        alert("請輸入正確的貼文id");
                    }
                });
            });
        } else {
            alert("請輸入貼文id");
        }
    });
});



//檢查登入狀態
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {

        //檢查用戶授權的權限有哪些
        // FB.api('/me/permissions', function(response) {
        //   console.log('授權的項目');
        //   console.log(response);
        // });

        // FB.api('me?fields=posts', function(response) {
        //   console.log('用戶塗鴉牆的貼文');
        //   console.log(response);
        // });

    } else {
        alert('請登入');
        document.location.href = "login.html";
    }
}


//登出按鈕
function logout() {
    FB.logout(function(response) {
        alert('登出成功');
        window.location.reload();
    });
}