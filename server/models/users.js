let sqlite = require('sqlite3')
let path = require('path')
let db = new sqlite.Database(path.join(__dirname, '../../datasource/Tarbazar-posDB.db'))

module.exports.getUsers=function(){
    return new Promise(function(reslove, reject){
        db.serialize(function(){
            db.all('SELECT * FROM users', function(err, rows){
                if(!err)
                {
                    reslove(rows)
                }
                else{
                    reject(err)
                }
            })
        })
    })
}

module.exports.getUsersStatus=function(){
    return new Promise(function(reslove, reject){
        db.serialize(function(){
            db.all('SELECT role FROM users WHERE islogged="true"', function(err, rows){
                if(!err)
                {
                    reslove(rows)
                }
                else{
                    reject(err)
                }
            })
        })
    })
}