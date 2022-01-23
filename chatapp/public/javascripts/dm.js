'use strict';

// 投稿メッセージをサーバに送信する
function directmsg() {
    console.log('dmが来た');
    // ユーザ名を取得
    const userName = $('#userName').val();
    //　相手のユーザ名を取得
    const otherUserName = $('#selectedUserName').val();
    // 入力されたメッセージを取得
    const dm = $('#message').val();

    // 投稿時間を取得
    var date = new Date();
    var dateString = date.toLocaleString({ timeZone: 'Asia/Tokyo' });

    // 投稿内容を送信
    // 空行や改行だけではないもの
    if($.trim(dm)){
        console.log('dmを送る');
        socket.emit('sendDmEvent', dm, userName, otherUserName, dateString);
        // 投稿フィールドをリセット
        $('#message').val('');
        console.log('dmを送った');
    }
    console.log(userName);
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveDmEvent', function (dm, userName, otherUserName, dateString) {
    console.log('dmをもう一回受け取った');
    // ユーザ名を取得
    dm = dm.replaceAll("\n", "<br>");
    const id = userName+otherUserName.replaceAll(/["/: "]/g, "");
    const selfUserName = $('#userName').val();
    if (selfUserName === otherUserName) {
        $('#thread').prepend('<div class="incoing_msg" id="' + id + '_div"><div class="received_msg"><div class="received_with_msg"><p>' + dm + '</p><span class="time_date"> (DM) ' + userName + 'さん '+ dateString + '</span></div></div></div>');
    }
});

// 自分用
socket.on('selfReceiveDmEvent', function (dm, userName, otherUserName, dateString) {
    dm = dm.replaceAll("\n", "<br>");
    const id = userName+otherUserName.replaceAll(/["/: "]/g, "");
    $('#thread').prepend('<div class="outgoing_dm" id="'+id+'_div">'+'<button type="button" value="メッセージを消す" id="' + id + '" onclick="trash(this.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>'+'<div class="sent_dm"><p>' + dm + '</p><span class="time_date"> (DM) '+ otherUserName +'さんへ ' + dateString + '</span></div></div>');
});


// DMのユーザをidで設定
function selectUserName(id){
    $('#selectedUserName').val(id);
    console.log($('#selectedUserName').val())
}