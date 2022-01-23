

//dbフォルダ以下は使用していません。Users.bdも

/*socket.on('sendUserData', function (data) {
    console.log('db.js' + data);
    //nameをだぶり禁止にする
    const sqlite3 = require("sqlite3");
    const db = new sqlite3.Database("./Users.db");
    db.run("drop table if exists Users");  
    db.run("create table if not exists Users(id integer primary key autoincrement,name, password)");
    db.run("insert into Users(name,password) values(?,?)", "hoge", "pass2");
    db.run("insert into Users(name,password) values(?,?)", data, "passhoge");
    db.each("select * from Users", (err, row) => {
        console.log(`${row.id}`, `${row.name}`, `${row.password}`);
    });

    db.close();
});

   exports.registerUser = function(userData){
        console.log('db.js' + userData);
        //nameをだぶり禁止にする
        const sqlite3 = require("sqlite3");
        const db = new sqlite3.Database("./Users.db");
        db.run("drop table if exists Users");  
        console.log('db.js' + userData);
        db.run("create table if not exists Users(id integer primary key autoincrement,name, password)");
        db.run("insert into Users(name,password) values(?,?)", "hoge", "pass2");
        db.run("insert into Users(name,password) values(?,?)", userData, "passhoge");
        db.each("select * from Users", (err, row) => {
            console.log(`${row.id}`, `${row.name}`, `${row.password}`);
        });

        db.close();
   }*/
    