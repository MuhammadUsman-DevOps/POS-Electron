

var product= " <div class='col-sm-2 col-xs-4' id=''>\
<a href='javascript:void(0)' class='addPct' id='product' onclick='add_item()'>\
   <div class='product color04 flat-box waves-effect waves-block' id='check'>\
      <h3 id='proname'></h3>\
      <input type='hidden' id='name' name='name' value=''>\
      <input type='hidden' id='price' name='price' value=''>\
      <input type='hidden' id='category' name='category' value='computers'>\
      <div class='mask'>\
         <h3 id='itemprice'></h3>\
          <p id='quantity'></p>\
         <p>NOTEBOOK, electronics, gadget</p>\
      </div>\
      <img id='p_img' src='' alt=''> \
            </div>\
</a>\
</div>";



var invoice="\
<div id='invoice-POS'>\
  <center id='top'>\
    <div class='logo'></div>\
    <div class='info'> \
      <h2 id='frenchise-name' class='h2'>Italian Mall</h2>\
    </div>\
    <div > Invoice #<span id='invoice-number'>1231</span></div>\
  </center>\
  <center>\
  <div id='mid'>\
    <div class='info'>\
      <h2 class='h2'></h2>\
      <p class='p'> \
      <span id='address'>street city, state 0000</span></br>\
      <span id='email'>JohnDoe@gmail.com</span></br>\
      <span id='phone'> 555-555-5555</span></br>\
      </p>\
    </div>\
  </div>\
  </center>\
  <div id='bot'>\
        <div id='table'>\
          <table>\
            <tr class='tabletitle'>\
              <td class='item'><h2 class='h2'>Item</h2></td>\
              <td class='Rate'><h2 class='h2'>Price</h2></td>\
              <td class='Hours'><h2 class='h2'>Qty</h2></td>\
              <td class='Rate'><h2 class='h2'>Amount</h2></td>\
            </tr>\
            <tr class='service'>\
              <td class='tableitem'><p class='itemtext p' id='i-item-name'></p></td>\
              <td class='tableitem'><p class='itemtext p' id='i-item-price'></p></td>\
              <td class='tableitem'><p class='itemtext p' id='i-item-qty'></p></td>\
              <td class='tableitem'><p class='itemtext p' id='i-item-amount'></p></td>\
            </tr>\
            <tr class='tabletitle'>\
            <td class='item'><h2 class='h2'>Sub Total</h2> <span id='i-sub-total'></span></td>\
              <td class='Rate'><h2 class='h2'>Discount</h2><span id='i-discount'></span></td>\
              <td class='Hours'><h2 class='h2'>Total</h2><span id='i-total'></span></td>\
              <td class='Rate'><h2 class='h2'>Change</h2><span id='i-change'></span></td>\
              </tr>\
          </table>\
        </div>\
        <div id='legalcopy'>\
          <p class='legal p'><strong>Thank you for your business!</strong></p>\
        </div>\
      </div>\
</div>\
"






var productlist="<div class='col-xs-12'><div class='panel panel-default product-details' id='cart-product'>\
	<div class='panel-body'><div class='col-xs-5 nopadding'>\
		<div class='col-xs-2 nopadding'>\
		<a href='javascript:void(0)' id='delete-product'>\
		<span class='fa-stack fa-sm productD'>\
		<i class='fa fa-circle fa-stack-2x delete-product'></i>\
		<i class='fa fa-times fa-stack-1x fa-fw fa-inverse'></i>\
		</span>\
		</a>\
		</div>\
		<div class='col-xs-10 nopadding'>\
		<span class='textPD' id='item-name'></span>\
		</div></div>\
		<div class='col-xs-2'>\
		<span class='textPD' id='item-price'></span>\
		</div>\
		<div class='col-xs-3 nopadding productNum'>\
		<a href='javascript:void(0)' id='decbutton'>\
		<span class='fa-stack fa-sm decbutton'>\
		<i class='fa fa-square fa-stack-2x light-grey'></i>\
		<i class='fa fa-minus fa-stack-1x fa-inverse white'></i>\
		</span></a>\
		<input type='text' id='qty' onchange='' class='form-control' value='1' placeholder='0' maxlength='2'>\
		<a href='javascript:void(0)'><span class='fa-stack fa-sm incbutton' id='incbutton'>\
		<i class='fa fa-square fa-stack-2x light-grey'></i><i class='fa fa-plus fa-stack-1x fa-inverse white'></i>\
		</span></a></div><div class='col-xs-2 nopadding'> <span class='subtotal textPD' id='cart-price'></span>\
</div></div></div></div>"






document.addEventListener("DOMContentLoaded", function(event) { 
window.onload=function(){

  var html;
      var data;
    $.ajax({

        method: 'GET',
        url: 'http://localhost:3000/product'
      }).then(function(response){
         response.forEach(function(item){


                html=  '<div class="col-sm-2 col-xs-4" id="">';
                 html+= '<a href="javascript:void(0)" class="addPct" id="product" onclick="add_item('+item.id+')">'
                  html+= '<div class="product color04 flat-box waves-effect waves-block" id="check">'
                  html+= '<h3 id="proname">'+item.name+'</h3>'
                 html+='<input type="hidden" id="name" name="name" value='+item.name+'>'
                 html+='<input type="hidden" id="price" name="price" value='+item.price+'>'
                 html+='<input type="hidden" id="category" name="category" value="computers">'
                 html+='<div class="mask">'
                 html+='<h3 id="itemprice"></h3>'
                  html+='<p id="quantity">'+item.quantity+'</p>'
                  html+='<p>NOTEBOOK, electronics, gadget</p>'
              html+='</div>'
             html+='<img id="p_img" src="" alt="">' 
            html+='</div>'
            html+='</a>'
            html+='</div>'

              console.log(item.name)
              console.log(item.price)
              console.log(item.quantity)
         
          $('#productList2').prepend(html);
            // document.getElementById('proname').innerHTML=item.name;
            // document.getElementById('name').value=item.name;
            // document.getElementById('price').value=item.price;
            // document.getElementById('itemprice').innerHTML=item.price;
            // document.getElementById('p_img').src=item.url;
            // document.getElementById('quantity').innerHTML=item.quantity;
            // document.getElementById('category').value=item.category; //PENDING YET
         
         })
      })
    
     //CANCEL SALE
     $('#cancel-sale').click(function(){
       $('#productList').fadeOut();
     })

  
}


  });

   
     
    

     // CHECK ON QUNATITY


  function if_item_in_cart()
  {
    var quantity=parseInt($('#qty').val())
    quantity+=1
    $('#qty').val(quantity)
    $('#cart-price').html($('#price').val()*quantity)
  }

  function add_item_to_cart()
  {
    //document.getElementById('productList').innerHTML+=productlist;
    //SET ATTRIBUTES
    $('#productList').prepend('')
    
    $('#item-name').html($('#proname').html())
    $('#item-price').html($('#price').val())
    $('#cart-price').html($('#price').val()*$('#qty').val())
  }

  function inc_dec_quantity(){
         // INCREASE QUANTITY
         document.getElementById('incbutton').addEventListener('click', function(){
          var qty=parseInt(document.getElementById('qty').value)
          qty+=1;
          if(qty>= parseInt($('#quantity').html()))
          {
           
          }
          document.getElementById('qty').value=qty;
          
          document.getElementById('cart-price').innerHTML=qty* parseInt(document.getElementById('item-price').innerHTML)
          document.getElementById('Subtot').innerHTML=qty* parseInt(document.getElementById('item-price').innerHTML)
          document.getElementById('total').innerHTML=qty* parseInt(document.getElementById('item-price').innerHTML)
      })
  
      //DESCREASE QUANTITY
      document.getElementById('decbutton').addEventListener('click', function(){
          var qty=parseInt(document.getElementById('qty').value)
          if(qty>0)
          qty-=1;

      
          document.getElementById('qty').value=qty;
          
          document.getElementById('cart-price').innerHTML=qty* parseInt(document.getElementById('item-price').innerHTML)
          document.getElementById('Subtot').innerHTML=qty* parseInt(document.getElementById('item-price').innerHTML)
          document.getElementById('total').innerHTML=qty* parseInt(document.getElementById('item-price').innerHTML)
      })
  }


  function update_total_prices(){
    $('#Subtot').html( parseInt($('#qty').val()) * parseInt($('#item-price').html()))
          $('#total').html( parseInt($('#qty').val()) * parseInt($('#item-price').html()))
  }



  function swal_for_quantity(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!'
      
    })
  }


//INVOICE GENERATION
  $('#show-receipt-button').click(function(){
    
    $('#ticket').addClass("in")
    $('#ticket').css('display','block')
    $('#printSection').html(invoice)

    $('#i-item-name').html($('#item-name').html())
    $('#i-item-price').html($('#item-price').html())
    $('#i-item-qty').html($('#qty').val())
    $('#i-item-amount').html($('#cart-price').html())

    $('#i-sub-total').html($('#Subtot').html())
    $('#i-discount').html($('#Discount-input').val())
    $('#i-total').html($('#total').html())
    $('#i-change').html($('#change').html())

  })



  // function printInvoice(){

  //   var data=document.getElementById('printSection').innerHTML;
  
  // }


  $('#print-invoice').click(function(){
  PrintDiv('invoice-POS')
  })



  function PrintDiv(divid) {
    var contents = document.getElementById(divid).innerHTML;
    var frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write('<html><head><title>DIV Contents</title>');
    frameDoc.document.write('<link rel="stylesheet" href="../assets/css/invoice.css"  type="text/css">');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 500);
    return false;
}


function add_item()
{

  if($('#name').val()==$('#item-name').html())
        {
          var quantity=parseInt($('#qty').val())
          quantity+=1
          $('#qty').val(quantity)
          $('#cart-price').html($('#price').val()*quantity)
          update_total_prices()
        }
        else{
          document.getElementById('productList').innerHTML+=(productlist);
          $('#item-name').html($('#proname').html())
          $('#item-price').html($('#price').val())
          $('#cart-price').html($('#price').val()*$('#qty').val())
          
          update_total_prices()
        }

         inc_dec_quantity()
         // delete item from cart
      $('#delete-product').click(function(){
        $('#cart-product').fadeOut();
      })

       // Calculate discount
     $('#Discount-input').keyup( function(){

      $('#total').html(parseInt($('#Subtot').html())-($('#Discount-input').val()));
 
      })
}
