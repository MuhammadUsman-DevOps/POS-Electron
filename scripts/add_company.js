$(document).ready(function(){

    $("#save-info").click(function(){
        var name=$("#companyName").val();
        var phone=$("#phone").val();
        var discount=$("#DefaultDiscount").val();
        var tax=$("#DefualtTax").val();
        var logo=$("#logo").val();
        if(logo!=""){
            $("#logo-img").attr("src",logo)
        }
        if(discount==""){
            discount=0;
        }
        if(tax=="")
        {
            tax=0;
        }
        data={
            "name":name,
            "phone":phone,
            "discount":discount,
            "tax":tax,
            "logo":logo,
        }
        dataJson=JSON.stringify(data)
        console.log(dataJson)
        $.ajax({
            type:'POST',
            contentType:'application/json; charset=utf-8',
            dataType:"json",
            url:"http://localhost:3000/company/update",
            data: dataJson,
            success: function(response){
                console.log(response.message)
            }
        })
    })
})