let $ = require('jquery')





$(document).ready(function(){
  
   // ************ CALL TO FRENCHISE API **************** 
    $.ajax({
  
      method: 'GET',
      url: 'http://localhost:3000/frenchise'
    }).then(function(response){
  
      response.forEach(function(item)  {
          console.log(item.NAME)
      });
    })

     // ************ CALL TO ATTRIBUTE API **************** 

     $.ajax({

        method: 'GET',
        url: 'http://localhost:3000/attribute'
     }).then(function(response){
         response.forEach(function(item){
             
         })
     })


     // ************ CALL TO CITY API **************** 

     $.ajax({

      method: 'GET',
      url: 'http://localhost:3000/city'
   }).then(function(response){
       response.forEach(function(item){
           
       })
   })


   // ************ CALL TO COUNTRY API **************** 

   $.ajax({

    method: 'GET',
    url: 'http://localhost:3000/country'
 }).then(function(response){
     response.forEach(function(item){
         
     })
 })


 // ************ CALL TO frenchiseSupplier API **************** 

 $.ajax({

  method: 'GET',
  url: 'http://localhost:3000/frenchiseSupplier'
}).then(function(response){
   response.forEach(function(item){
       
   })
})


// ************ CALL TO inventory API **************** 

$.ajax({

  method: 'GET',
  url: 'http://localhost:3000/inventory'
}).then(function(response){
   response.forEach(function(item){
       
   })
})


// ************ CALL TO organization API **************** 

$.ajax({

  method: 'GET',
  url: 'http://localhost:3000/organization'
}).then(function(response){
   response.forEach(function(item){
       
   })
})


// ************ CALL TO productAttribute API **************** 

$.ajax({

  method: 'GET',
  url: 'http://localhost:3000/productAttribute'
}).then(function(response){
   response.forEach(function(item){
       
   })
})


// ************ CALL TO productCategory API **************** 

$.ajax({

  method: 'GET',    
  url: 'http://localhost:3000/productCategory'
}).then(function(response){
   response.forEach(function(item){
       
   })
})



// ************ CALL TO productImgs API **************** 

$.ajax({

  method: 'GET',
  url: 'http://localhost:3000/productImgs'
}).then(function(response){
   response.forEach(function(item){
       
   })
})




// ************ CALL TO productStatus API **************** 

$.ajax({

  method: 'GET',
  url: 'http://localhost:3000/productStatus'
}).then(function(response){
   response.forEach(function(item){
       
   })
})





// ************ CALL TO productSubCategory API **************** 

$.ajax({

  method: 'GET',
  url: 'http://localhost:3000/productSubCategory'
}).then(function(response){
   response.forEach(function(item){
       
   })
})





// ************ CALL TO product API **************** 

$.ajax({

  method: 'GET',
  url: 'http://localhost:3000/product'
}).then(function(response){
   response.forEach(function(item){
       
   })
})





// ************ CALL TO shipmentRequest API **************** 

$.ajax({

  method: 'GET',
  url: 'http://localhost:3000/shipmentRequest'
}).then(function(response){
   response.forEach(function(item){
       
   })
})





// ************ CALL TO ATTRIBUTE API **************** 

$.ajax({

  method: 'GET',
  url: 'http://localhost:3000/shipment'
}).then(function(response){
   response.forEach(function(item){
       
   })
})





// ************ CALL TO subcategoryAttribute API **************** 

$.ajax({

  method: 'GET',
  url: 'http://localhost:3000/subcategoryAttribute'
}).then(function(response){
   response.forEach(function(item){
       
   })
})


// ************ CALL TO supplier API **************** 

$.ajax({

  method: 'GET',
  url: 'http://localhost:3000/supplier'
}).then(function(response){
   response.forEach(function(item){
       
   })
})


$.ajax({
  
  method: 'GET',
  url: 'http://localhost:3000/users'
}).then(function(response){

  response.forEach(function(item)  {
      console.log(item.username)
  });
})



  })

