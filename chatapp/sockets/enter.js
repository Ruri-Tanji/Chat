'use strict';

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterEvent', function (enterUserName) {
        
        //sqlite3を使えるようにしている
        const sqlite3 = require("sqlite3");

        //データベースを操作するためのインスタンス的なやつを生成している?
        //引数は使用するデータベースファイルだと思う。ここで使用されているのはhackathon/chatapp/Users.db
        const db = new sqlite3.Database("./Users.db");

        // db.run("drop table if exists Users");　//データを保存するためコメントアウト。テーブルを消したければコメントアウト外す。
        
        console.log('db.js: ' + enterUserName);

        //テーブルの作成
        db.run("create table if not exists Users(id integer primary key autoincrement,name text, status integer)");

        db.get(`select status from Users where name ='${enterUserName}'`, (err, row) => {
            //DB上に存在する場合
            console.log("select: ",row);
            if(row){
                // statusが0(退室時)は入室可能
                if(row.status == '0'){
                    console.log('入室可能');
                    // statusを1に変更
                    db.run(`update Users set(status)=1 where name='${enterUserName}'`);
                    // 入室を他の人に通知
                    socket.broadcast.emit('receiveEnterEvent', enterUserName);
                    // 入室処理を自分にだけ通知
                    socket.emit('selfReceiveEnterEvent');
                }
                // statusが1(入室時)は入室不可
                else{
                    console.log('入室不可能');
                    socket.emit('receiveLoginReject');
                }
            }
            // DBに存在しない場合は、DBに追加して入室可能
            else{
                console.log('存在しない');
                // 新しいユーザをDBに追加する(statusは1)
                db.run("insert into Users(name,status) values(?,?)", enterUserName, 1);
                // 入室を他の人に通知
                socket.broadcast.emit('receiveEnterEvent', enterUserName);
                // 入室処理を自分にだけ通知
                socket.emit('selfReceiveEnterEvent');
            }
        });

        db.close();
    });

    socket.on('sendLoginUsers', function () {
        const sqlite3 = require("sqlite3");
        const db = new sqlite3.Database("./Users.db");

        // ログインユーザの一覧を表示する
        db.all(`select name from Users where status=1`, (err, row) => {
            console.log(row);
            io.sockets.emit('receiveLoginUsers', row);
        });

        db.close();
    });
};
