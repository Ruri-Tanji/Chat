'use strict';
// require('date-utils');

// メモを画面上に表示する
function memo() {    
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    var message = $('#message').val();

    // メモの内容を表示
    var date = new Date(); // メモ日付の追加
    var dateString = date.toLocaleString({ timeZone: 'Asia/Tokyo' }); // フォーマットを変更

    // 空白以外は投稿
    if($.trim(message)) {
        console.log(message);
        message = message.replaceAll("\n", "<br>");
        const id = userName + dateString.replaceAll(/["/: "]/g, "");
        // ボタンのidは"名前"+"日付(数字のみ)"、divのidは"ボタンのid"+"_div"
        $('#thread').prepend('<div class="outgoing_msg" id="' + id + '_div"><button class="sent_msg_trash" type="button" value="メッセージを消す" id="' + id + '" onclick="trash(this.id);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>'+'<div class="sent_msg"><p>' + message + '</p><span class="time_date">' + dateString + ' (メモ)' + '</span></div></div>')
        // 投稿フィールドをリセット
        $('#message').val('');
        console.log(userName + 'さんが' + message + 'を入力しました');
    }
    return false;
}
