$("#logout-btn").click(function(){
    var username=$("#username").html();
    updateUserStatus(username)
    updateLastActive(username)
})

function updateUserStatus(username){
  islogged="false"
    var suppData={
      "username":username,
      "islogged":islogged
  }
  
  var suppJson=JSON.stringify(suppData);
  
  $.ajax({
  
      type:'POST',
      contentType:'application/json; charset=utf-8',
      dataType:"json",
      url:"http://localhost:3000/user/logged/status",
      data:suppJson,
      success:function(response){
          console.log(response.message)
      }
  })
  }

  function updateLastActive(username){
    var dt=new Date();
    lastactive=dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()+" "+dt.getDay()+"-"+dt.getMonth()+"-"+dt.getFullYear();
      var suppData={
        "username":username,
        "lastactive":lastactive
    }
    
    var suppJson=JSON.stringify(suppData);
    
    $.ajax({
    
        type:'POST',
        contentType:'application/json; charset=utf-8',
        dataType:"json",
        url:"http://localhost:3000/user/update/lastactive",
        data:suppJson,
        success:function(response){
            console.log(response.message)
        }
    })
  }