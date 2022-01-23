'use strict';

const { use } = require("../routes");

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendDmEvent', function (dm, userName, otherUserName, dateString) {
        console.log('dmを受信した');
        socket.emit('selfReceiveDmEvent', dm, userName, otherUserName, dateString);
        socket.broadcast.emit('receiveDmEvent', dm, userName, otherUserName, dateString);
        console.log(userName + 'さんから' + otherUserName + 'さんへ' + dm + 'というDMを受け取りました');
    });
};