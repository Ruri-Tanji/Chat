'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = $('#userName').val();

    var ret = confirm("退室します。よろしいですか?");
    // 退室メッセージイベントを送信する
    if (ret == true){
        socket.emit('sendExitEvent', userName);
        // 退室
        location.href = '/';
    }
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('reseiveExitEvent', function (exitUserName) {
    $('#thread').prepend('<p class="exit_comment"> ---' + exitUserName +'さんが退出したよ --- </p>');
});
