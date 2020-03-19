$(document).ready(function(){
    $('#addProduct').click(function(){
        var name=$('#ProductName').val();
        var price=$('#PurchasePrice').val();
        var quantity=$('#Unit').val();

      var productData={
        "name":name,
        "price":price,
        "quantity":quantity
      }
      var dataJson=JSON.stringify(productData);

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType:"json",
            url:'http://localhost:3000/product/add',
            data: dataJson,
            success: function(response){
            }
        })
    })
})

window.onload=function(){

   this.fetchProducts();
  
}



function fetchProducts(){

    
    var html;
    $.ajax({

        method: 'GET',
        url: 'http://localhost:3000/product'
      }).then(function(response){
         response.forEach(function(item){
            html='<tr role="row" class="odd" row_id="'+item.id+'">'
            html += '<td><div class="row_data" edit_type="click" col_name="id">'+item.id+'</div></td>'
            html += '<td><div class="row_data" edit_type="click" col_name="name">'+item.name+'</div></td>'
            html += '<td><div class="row_data" edit_type="click" col_name="price">'+item.price+'</div></td>'
            html += '<td><div class="row_data" edit_type="click" col_name="quantity">'+item.quantity+'</div></td>'
            html += '<td><div class="row_data" edit_type="click" col_name="category">'+item.quantity+'</div></td>'
            html += '<td><div class="row_data" edit_type="click" col_name="url">'+item.quantity+'</div></td>'
            html+=  '<td>'+
             '<div class="btn-group">'
                        +' <a class="product-id btn btn-default" href="#" title="Delete" id="'+item.id+'"><i class="fa fa-times" id="cross" onclick="deleteProduct('+item.id+')"></i></a>'
                        +' <span class="btn_edit"> <a class="btn btn-default" href="#" title="Edit" id="'+item.id+'" row_id="'+item.id+'"><i class="fa fa-pencil"></i></a></span>'
                       +'<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="'+item.id+'"> Save</a> | </span>'
                       +'<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="'+item.id+'"> Cancel</a> | </span>'
                      +' </div></td></tr>';  
            
            $('#table-data').prepend(html);
            editProduct();
            $('#cross').click(function(){
              $(this).closest("tr").remove();
              //location.reload();
            })
           
         })
         
      })

      
}




function deleteProduct(productid){
  if(confirm("DELETE: Are you sure?"))
  {
  var id =productid;
  var data={
      "id":id
  }
  var dataJson=JSON.stringify(data);
  $.ajax({
      type:'POST',
      contentType: "application/json; charset=utf-8",
      dataType:"json",
      url:'http://localhost:3000/product/dlt',
      data:dataJson,
      success:function(response){
       
      }
  })
}
}




//href="/product/dlt/'+item.id+'"


"<a class='btn btn-default' href='javascript:void(0)' data-toggle='popover' data-placement='left'  data-html='true' title='Are you sure ?' data-content=''><i class='fa fa-times'></i></a>" 




function editProduct(){
  $(document).find('.btn_save').hide();
$(document).find('.btn_cancel').hide(); 


//--->make div editable > start
$(document).on('click', '.row_data', function(event) 
{
  event.preventDefault(); 

  if($(this).attr('edit_type') == 'button')
  {
    return false; 
  }

  //make div editable
  $(this).closest('div').attr('contenteditable', 'true');
  //add bg css
  $(this).addClass('bg-warning').css('padding','5px');

  $(this).focus();
})	
//--->make div editable > end


//--->save single field data > start
$(document).on('focusout', '.row_data', function(event) 
{
  event.preventDefault();

  if($(this).attr('edit_type') == 'button')
  {
    return false; 
  }

  var row_id = $(this).closest('tr').attr('row_id'); 
		var tbl_row = $(this).closest('tr');
		var row_div = $(this)				
		.removeClass('bg-warning') //add bg css
        .css('padding','')
        
        var arr = {}; 
		tbl_row.find('.row_data').each(function(index, val) 
		{   
			var col_name = $(this).attr('col_name');  
			var col_val  =  $(this).html();
			arr[col_name] = col_val;
		});
  // var col_name = row_div.attr('col_name'); 
  // var col_val = row_div.html(); 

  // var arr = {};
  // arr[col_name] = col_val;

  //use the "arr"	object for your ajax call
  $.extend(arr, {row_id:row_id});
  updateProduct(arr)
  //out put to show
  $('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>');
  
})	
//--->save single field data > end


//--->button > edit > start	
$(document).on('click', '.btn_edit', function(event) 
{
  event.preventDefault();
  var tbl_row = $(this).closest('tr');

  var row_id = tbl_row.attr('row_id');

  tbl_row.find('.btn_save').show();
  tbl_row.find('.btn_cancel').show();

  //hide edit button
  tbl_row.find('.btn_edit').hide(); 

  //make the whole row editable
  tbl_row.find('.row_data')
  .attr('contenteditable', 'true')
  .attr('edit_type', 'button')
  .addClass('bg-warning')
  .css('padding','3px')

  //--->add the original entry > start
  tbl_row.find('.row_data').each(function(index, val) 
  {  
    //this will help in case user decided to click on cancel button
    $(this).attr('original_entry', $(this).html());
  }); 		
  //--->add the original entry > end

});
//--->button > edit > end


//--->button > cancel > start	
$(document).on('click', '.btn_cancel', function(event) 
{
  event.preventDefault();

  var tbl_row = $(this).closest('tr');

  var row_id = tbl_row.attr('row_id');

  //hide save and cacel buttons
  tbl_row.find('.btn_save').hide();
  tbl_row.find('.btn_cancel').hide();

  //show edit button
  tbl_row.find('.btn_edit').show();

  //make the whole row editable
  tbl_row.find('.row_data')
  .attr('edit_type', 'click')
  .removeClass('bg-warning')
  .css('padding','') 

  tbl_row.find('.row_data').each(function(index, val) 
  {   
    $(this).html( $(this).attr('original_entry') ); 
  });  
});
//--->button > cancel > end


//--->save whole row entery > start	
$(document).on('click', '.btn_save', function(event) 
{
  event.preventDefault();
  var tbl_row = $(this).closest('tr');

  var row_id = tbl_row.attr('row_id');

  
  //hide save and cacel buttons
  tbl_row.find('.btn_save').hide();
  tbl_row.find('.btn_cancel').hide();

  //show edit button
  tbl_row.find('.btn_edit').show();


  //make the whole row editable
  tbl_row.find('.row_data')
  .attr('edit_type', 'click')
  .removeClass('bg-warning')
  .css('padding','') 

  //--->get row data > start
  var arr = {}; 
  tbl_row.find('.row_data').each(function(index, val) 
  {   
    var col_name = $(this).attr('col_name');  
    var col_val  =  $(this).html();
    arr[col_name] = col_val;
  });
  //--->get row data > end

  //use the "arr"	object for your ajax call
  $.extend(arr, {row_id:row_id});
  updateProduct(arr);
  //out put to show
  $('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>')
   

});
//--->save whole row entery > end




}

function updateProduct(arr){
      
  var dataJson=JSON.stringify(arr);
  $.ajax({
      type:'POST',
      contentType: "application/json; charset=utf-8",
      dataType:"json",
      url:"http://localhost:3000/product/update",
      data: dataJson,
      success: function(response){
        console.log(response.message)
      }
  })

}

// +"<a class='btn color01 white open-modalimage' data-id='08153b71766514c0d83ea3ea97de00f2.jpg' href='' data-toggle='modal' data-target='#ImageModal'><i class='fa fa-picture-o' data-toggle='tooltip' data-placement='top' title='View Image'></i></a>"         
// +"<a class='btn btn-default' href='javascript:void(0)'' data-toggle='modal' data-target='#barcode' onclick='productBcode = 123456'><i class='fa fa-barcode' data-toggle='tooltip' data-placement='top' title='print barcode'></i></a>"
// +"</div>"
// +'</td></tr>';