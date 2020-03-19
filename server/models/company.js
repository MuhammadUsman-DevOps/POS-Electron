let sqlite=require('sqlite3')
let path=require('path')
let db=new sqlite.Database(path.join(__dirname,'../../datasource/Tarbazar-posDB.db'))

module.exports.getCompany=function(){
    return new Promise(function(resolve, reject){
        db.serialize(function(){
            db.all('SELECT * from comapny', function(err, rows){
                if(!err){
                    resolve(rows)
                }
                else{
                    reject(err)
                }
            })
        })
    })
}