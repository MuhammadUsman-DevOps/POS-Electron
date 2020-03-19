let sqlite = require('sqlite3')
let path = require('path')
let db = new sqlite.Database(path.join(__dirname, '../../datasource/Tarbazar-posDB.db'))

module.exports.getProductAttribute=function(){
    return new Promise(function(reslove, reject){
        db.serialize(function(){
            db.all('SELECT * FROM PRODUCT_ATTRIBUTE', function(err, rows){
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