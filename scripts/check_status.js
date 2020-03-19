
$(document).ready(function(){
  var count=1;
    $.ajax({
        method:'GET',
        url:'http://localhost:3000/user/status'
    }).then(function(response){
        response.forEach(function(item){
            
          
            if(item.role=="staff"){
                
                $("#sales").removeAttr("href")
            }
            
        });
        
    })

})
