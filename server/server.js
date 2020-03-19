let express = require('express')
let app = express() 

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let sqlite = require('sqlite3')
let path = require('path')
let db = new sqlite.Database(path.join(__dirname, '../datasource/Tarbazar-posDB.db'))

// ************* IMPORT MODELS *************
let frenchise = require('./models/frenchises.js')
let attribute = require('./models/attribute')
let city = require('./models/city')
let country = require('./models/country')
let frenchiseSupplier = require('./models/frenchise_supplier')
let inventory = require('./models/inventory')
let organization = require('./models/organization')
let productAttribute = require('./models/product_attribute')
let productCategory = require('./models/product_category')
let productImgs = require('./models/product_images')
let productStatus = require('./models/product_status')
let productSubCategory = require('./models/product_subcategory')
let product = require('./models/product')
let shipmentRequest = require('./models/shipment_request')
let shipment = require('./models/shipment')
let subCategoryAttribute = require('./models/subcategory_attribute')
let supplier = require('./models/supplier')
let user = require('./models/users')
let customer = require('./models/customer')
let expense = require('./models/expense')
let company=require('./models/company')



// **************** GET FRENCHISES ***********************
app.get('/frenchise', function(req,res){

    frenchise.getFrenchise().then(function(response){
        res.json(response)
    }).catch(function() 
    {
        //ERROR MESSAGE TO BE SPECIFIED LATER
    }) 

})

// **************** GET ATTRIBUTES ***********************

app.get('/attribute', function(req, res){

    attribute.getAttribute().then(function(response){
        res.json(response)
    }).catch(function(){
        //ERROR MESSAGE TO BE SPECIFIED LATER
    })

})


// **************** GET CITY *********************** 
app.get('/city',function(req, res){
    
    city.getCity().then(function(response){
        res.json(response)
    }).then(function(){

    })
})


// **************** GET COUNTRY ***********************
app.get('/country',function(req, res){
    
    country.getCountry().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})


// **************** GET FRECHISE SUPPLIER ***********************
app.get('/frenchiseSupplier',function(req, res){
    
    frenchiseSupplier.getFrenchiseSupplier().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})


// **************** GET INVENTORY ***********************
app.get('/inventory',function(req, res){
    
    inventory.getInventory().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})


// **************** GET ORGANIZATION ***********************
app.get('/organization',function(req, res){
    
    organization.getOrganization().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})



// **************** GET PRODUCT ATTRIBUTES ***********************
app.get('/productAttribute',function(req, res){
    
    productAttribute.getProductAttribute().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})




// **************** GET PRODUCT CATEGORY ***********************
app.get('/productCategory',function(req, res){
    
    productCategory.getProductCategory().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})




// **************** GET PRODUCT IMAGES ***********************
app.get('/productImgs',function(req, res){
    
    productImgs.getProductImages().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})



// **************** GET PRODUCT STATUS ***********************
app.get('/productStatus',function(req, res){
    
    productStatus.getProductStatus().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})




// **************** GET PRODUCT SUBCATEGORY ***********************
app.get('/productSubCategory',function(req, res){
    
    productSubCategory.getProductSubCategory().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})




// **************** GET PRODUCT ***********************
app.get('/product',function(req, res){
    
    product.getProduct().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})



app.post('/product/add', function(req, res){
        var data={
            name: req.body.name,
            price:req.body.price,
            qty: req.body.quantity
        }

        var sql='INSERT INTO products(name,price,quantity) VALUES(?,?,?)';
        var params=[data.name, data.price, data.qty]
        db.run(sql, params, function(err, result){
            if(err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id" : this.lastID
            })
        })

})


app.post('/suppliers/add', function(req, res){
    var recData={
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        note: req.body.note,
    }
   var sql='INSERT INTO SUPPLIER (NAME,PHONE,email,address,note) VALUES(?,?,?,?,?)';
   var params=[recData.name,recData.phone, recData.email, recData.address,recData.note]
   db.run(sql, params, function(err, result){
       if(err){
           console.log(err.message)
           res.status(400).json({"error":err.message})
           return;
       }
       res.json({
           "message":"success",
           "data": recData,
           "id":this.lastID
       })
   })

})


app.post('/supplier/update', function(req, res){
    var recData={
        id:req.body.ID,
        name: req.body.NAME,
        phone: req.body.PHONE,
        email: req.body.email,
        address: req.body.address,
        note:req.body.note,
    }
   var sql='UPDATE SUPPLIER SET NAME=?,PHONE=?,email=?,address=?,note=? WHERE ID=?';
   var params=[recData.name,recData.phone, recData.email, recData.address, recData.note,recData.id]
   db.run(sql, params, function(err, result){
       console.log(sql)
       console.log(params)
       if(err){
           console.log(params)
           console.log(err.message)
           res.status(400).json({"error":err.message})
           return;
       }
       res.json({
           "message":"success",
           "data": recData,
           "id":this.lastID
       })
   })

})





app.post('/customer/add', function(req, res){
    var recData={
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        discount: req.body.discount,
        date: req.body.date,
    }
   var sql='INSERT INTO customers(name,phone,email,discount,date) VALUES(?,?,?,?,?)';
   var params=[recData.name,recData.phone, recData.email, recData.discount, recData.date]
   db.run(sql, params, function(err, result){
       if(err){
           console.log(err.message)
           res.status(400).json({"error":err.message})
           return;
       }
       res.json({
           "message":"success",
           "data": recData,
           "id":this.lastID
       })
   })

})


app.post('/product/dlt', function(req,res){
    var data={
        id:req.body.id
    }

    var sql='DELETE FROM products WHERE id=?';
    var params=[data.id]
    db.run(sql,params, function(err, result){
        if(err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":data,
            "id":this.lastID
        })
    })
})



// **************** GET SHIMPENT REQUEST ***********************
app.get('/shipmentRequest',function(req, res){
    
    shipmentRequest.getShipmentRequest().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})


app.get('/company', function(req, res){
        company.getCompany().then(function(response){
            res.json(response)
        }).then(function(){

        })
})


app.post('/company/update', function(req, res){


    var data={
        name: req.body.name,
        phone:req.body.phone,
        discount: req.body.discount,
        tax:req.body.tax,
        logo:req.body.logo
    }

    var sql='UPDATE company set name=?,phone=?,discount=?,tax=?,logo=?';
    var params=[data.name, data.phone, data.discount, data.tax, data.logo]
    db.run(sql, params, function(err, result){
        if(err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    })

})


// **************** GET SHIPMENT ***********************
app.get('/shipment',function(req, res){
    
    shipment.getShipment().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})



// **************** GET SUBCATEGORY ATTRIBUTE ***********************
app.get('/subcategoryAttribute',function(req, res){
    
    subCategoryAttribute.getSubCategoryAttribute().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})

// **************** GET SUPPLIER ***********************

app.get('/supplier', function(req, res){
    supplier.getSupplier().then(function(response){
        res.json(response)

    }).then(function(){

    })
})



app.get('/expense', function(req, res){
    expense.getExpense().then(function(response){
        res.json(response)

    }).then(function(){

    })
})


app.post('/expense/add', function(req, res){
    var data={
        createdDate: req.body.createdDate,
        reference:req.body.reference,
        amount: req.body.amount,
        description:req.body.description
    }

    var sql='INSERT INTO expense(date,reference,amount,description) VALUES(?,?,?,?)';
    var params=[data.createdDate, data.reference, data.amount, data.description]
    db.run(sql, params, function(err, result){
        if(err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    })

})


app.post('/expense/update', function(req, res){
    var data={
        id:req.body.id,
        date: req.body.date,
        reference:req.body.reference,
        amount: req.body.amount,
        description:req.body.description
    }

    var sql='UPDATE expense SET date=?,reference=?,amount=?,description=? WHERE id=?';
    var params=[data.date, data.reference, data.amount, data.description, data.id]
    db.run(sql,params, function(err, result){
        if(err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    })

})


app.post('/product/update', function(req, res){

    var data={
        id:req.body.id,
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity
    }

    var sql='UPDATE products set name=?,price=?,quantity=? WHERE id=?';
    var params=[data.name,data.price,data.quantity,data.id]
    db.run(sql, params, function(err, result){
        if(err){
            res.status(400).json({"error":err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":data,
            "id":this.lastID
        })
    })
})


app.post('/customer/update', function(req, res){
    var data={
        id:req.body.id,
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        discount:req.body.discount,
        createdDate:req.body.createdDate,
    }

    var sql='UPDATE customers set name=?,phone=?,email=?,discount=?,date=? WHERE id=?';
    var params=[data.name,data.phone,data.email,data.discount,data.createdDate,data.id]
    db.run(sql, params, function(err, result){
        if(err){
            res.status(400).json({"error":err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":data,
            "id":this.lastID
        })
    })
})



app.post('/expense/dlt', function(req,res){
    var data={
        id:req.body.id
    }

    var sql='DELETE FROM expense WHERE ID=?';
    var params=[data.id]
    db.run(sql,params, function(err, result){
        if(err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":data,
            "id":this.lastID
        })
    })
})



app.post('/supplier/dlt', function(req,res){
    var data={
        id:req.body.id
    }

    var sql='DELETE FROM SUPPLIER WHERE ID=?';
    var params=[data.id]
    db.run(sql,params, function(err, result){
        if(err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":data,
            "id":this.lastID
        })
    })
})




app.post('/customer/dlt', function(req,res){
    var data={
        id:req.body.id
    }

    var sql='DELETE FROM customers WHERE id=?';
    var params=[data.id]
    db.run(sql,params, function(err, result){
        if(err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":data,
            "id":this.lastID
        })
    })
})


// **************** GET USERS ***********************

app.get('/users', function(req, res){
    user.getUsers().then(function(response){
        res.json(response)

    }).then(function(){

    })
})

app.post('/user/dlt', function(req,res){
    var data={
        id:req.body.id
    }

    var sql='DELETE FROM users WHERE id=?';
    var params=[data.id]
    db.run(sql,params, function(err, result){
        if(err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":data,
            "id":this.lastID
        })
    })
})


app.post('/user/update', function(req, res){
    var data={
        id:req.body.id,
        fname:req.body.fname,
        lname:req.body.lname,
        username:req.body.username,
        role:req.body.role,
        lastactive:req.body.lastactive
    }

    var sql='UPDATE users set fname=?,lname=?,username=?,role=?,lastactive=? WHERE id=?';
    var params=[data.fname,data.lname,data.username,data.role,data.lastactive,data.id]
    db.run(sql, params, function(err, result){
        if(err){
            res.status(400).json({"error":err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":data,
            "id":this.lastID
        })
    })
})


app.post('/user/add', function(req, res){
    var data={
        fname:req.body.fname,
        lname:req.body.lname,
        username:req.body.username,
        role:req.body.role,
        password:req.body.password
    }

    var sql='INSERT INTO users (fname,lname,username,password,role) VALUES(?,?,?,?,?)';
    var params=[data.fname,data.lname,data.username,data.password,data.role]
    db.run(sql, params, function(err, result){
        if(err){
          
            res.status(400).json({"error":err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":data,
            "id":this.lastID
        })
    })
})

app.post('/user/logged/status', function(req, res){
    var data={
        username:req.body.username,
        islogged:req.body.islogged
    }

    var sql='UPDATE users SET islogged=? WHERE username=?';
    var params=[data.islogged,data.username]
    db.run(sql, params, function(err, result){
        if(err){
          
            res.status(400).json({"error":err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":data,
            "id":this.lastID
        })
    })
})





app.post('/user/update/lastactive', function(req, res){
    var data={
        username:req.body.username,
        lastactive:req.body.lastactive
    }

    var sql='UPDATE users SET lastactive=? WHERE username=?';
    var params=[data.lastactive,data.username]
    db.run(sql, params, function(err, result){
        if(err){
          
            res.status(400).json({"error":err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":data,
            "id":this.lastID
        })
    })
})















app.get('/customer',function(req, res){
    
   customer.getCustomer().then(function(response){
        res.json(response)
    }).then(function(){
        
    })
})

app.get('/user/status', function(req, res){
    user.getUsersStatus().then(function(response){
        res.json(response)
    }).then(function(){

    })
})







app.listen(3000, function(){
   
    console.log('server is running on 3000')
})




