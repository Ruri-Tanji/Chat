'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitEvent', function (exitUserName) {
        socket.broadcast.emit('reseiveExitEvent', exitUserName);
        //sqlite3を使えるようにしている
        const sqlite3 = require("sqlite3");

        //データベースを操作するためのインスタンス的なやつを生成している?
        //引数は使用するデータベースファイルだと思う。ここで使用されているのはhackathon/chatapp/Users.db
        const db = new sqlite3.Database("./Users.db");

        db.get(`select name from Users where name ='${exitUserName}'`, (err, row) => {
            console.log(row);
            console.log(err);
            db.run(`update Users set(status)=0 where name='${exitUserName}'`);
        });
        db.close();

    });
};
