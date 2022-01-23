'use strict';

const { use } = require("../routes");

module.exports = function (socket, io) {

    // 投稿メッセージを消す
    socket.on('sendTrashMessage', function (id) {
        io.sockets.emit('receiveTrashMessage', id);
    });

    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (message, userName, dateString) {
        //自分宛
        socket.emit('selfReceiveMessageEvent', message, userName, dateString);
        //他人宛
        socket.broadcast.emit('receiveMessageEvent', message, userName, dateString);
        console.log(userName + 'さんから' + message + 'というコメントを受け取りました' + dateString);

        //sqlite3を使えるようにしている
        const sqlite3 = require("sqlite3");

        //データベースを操作するためのインスタンス的なやつを生成している?
        //引数は使用するデータベースファイルだと思う。ここで使用されているのはhackathon/chatapp/Publish.db
        const db = new sqlite3.Database("./Publish.db");

        //データを保存するためコメントアウト。テーブルを消したければコメントアウト外す。
        //db.run("drop table if exists Publish");

        //テーブルの作成
        db.run("create table if not exists Publish(id integer primary key autoincrement, name, message, time)");

        //入力されたユーザーネーム、メッセージ、時間をデータベースに保存。
        db.run("insert into Publish(name, message, time) values(?,?, ?)", userName, message, dateString);

        //データベースに保存されているデータの出力
        db.each("select * from Publish", (err, row) => {
            console.log(`${row.name}`, `${row.message}`, `${row.time}`);
        });

        db.close();
    });
};