'use strict';

// 誰かが入室するたびに行うイベント
// チャットルームに入室する
function enter() {
    // 入室メッセージをサーバに送信する
    // 入力されたユーザ名を取得する
    const userName = $('#userName').val();

    // ユーザ名が未入力でないかチェックする
    if(userName == ""){
        alert('ユーザー名を入力してください');
    }else{
        socket.emit('sendEnterEvent', userName);
    }
}
// メッセージでエンターキーが押されたら投稿する
$("#userName").keypress(function(e) {
    // エンターキーのみが押されたら投稿する
    if (e.keyCode == 13) {
        enter();
        return false;
    }
});

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterEvent', function (enterUserName) {
    console.log('db.js' + enterUserName);
    $('#thread').prepend('<p class="enter_comment"> ~~~' + enterUserName +'さんが入ってきたよ ~~~ </p>');
});

// 入室する
socket.on('selfReceiveEnterEvent', function () {
    $('form').submit();
});

// チャットルームに入らない(同じ名前でログインしている)
socket.on('receiveLoginReject', function () {
    alert('この名前は使われています。違う名前を入力してください');
});


// ページを更新するたびに行うイベント

// 入力されたユーザ名を取得する
const userName = $('#userName').val();
// 入室メッセージイベントを送信する
socket.emit('sendLoginUsers');
// ログインしているユーザ名を一覧表示する
socket.on('receiveLoginUsers', function (loginUsers) {
    // 一旦消してから一覧を再び書く
    $('#loginUsers').empty();
    for(let login of loginUsers){
        $('#loginUsers').prepend('<button class="btn-dm" type="button" id="' + login.name + '" onclick="selectUserName(this.id);">' + '<img src="/img/user.png" height="23">' + login.name + '</button><br>');
    }
    $('#loginUsers').prepend('<h3> ログインユーザ 一覧 <h3>');
});