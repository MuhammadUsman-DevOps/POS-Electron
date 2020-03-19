$(document).ready(function(){

    $('#add-expense').click(function(){
        var reference=$('#Reference').val();
        var amount=$('#Amount').val();
        var description=$('#Description').val();
        

        var date = new Date($('#Date').val());
        day = date.getDate();
        month = date.getMonth();
        year = date.getFullYear();
       
        createdDate=[day, month, year].join('-')
        alert(createdDate);
      

        var suppData={
            "createdDate":createdDate,
            "reference":reference,
            "amount":amount,
            "description":description
        }
  
        var suppJson=JSON.stringify(suppData);
        if(date!=null && amount!=null)
        {
          
        $.ajax({
  
            type:'POST',
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            url:'http://localhost:3000/expense/add',
            data:suppJson,
            success:function(response){
                console.log(response.message)
            }
        })
      }
      else{
        alert("Date and Amount are required")
      }
    })
  
  
  })



  window.onload=function(){
    this.fetchExpenses();
  }
  
  function fetchExpenses(){
      var html;
      $.ajax({
  
          method:'GET',
          url:'http://localhost:3000/expense'
      }).then(function(response){
          response.forEach(function(item){
        html='<tr role="row" class="odd" row_id="'+item.id+'">' 
        html+='<td hidden><div class="row_data" edit_type="click" col_name="id">'+item.id+'</div></td>'
        html+= '<td><div class="row_data" edit_type="click" col_name="date">'+item.date+'</div></td>'
        html+=  '<td><div class="row_data" edit_type="click" col_name="reference">'+item.reference+'</div></td>'
        html+=  '<td><div class="row_data" edit_type="click" col_name="amount">'+item.amount+'</div></td>'
        html+= '<td><div class="row_data" edit_type="click" col_name="description">'+item.description+'</div></td>'
        html+=  '<td>'+
             '<div class="btn-group">'
                        +' <a class="expense-id btn btn-default" href="#" title="Delete" id="'+item.id+'"><i class="fa fa-times" id="cross" onclick="deleteExpense('+item.id+')"></i></a>'
                        +' <span class="btn_edit"> <a class="btn btn-default" href="#" title="Edit" id="'+item.id+'" row_id="'+item.id+'"><i class="fa fa-pencil"></i></a></span>'
                       +'<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="'+item.id+'"> Save</a> | </span>'
                       +'<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="'+item.id+'"> Cancel</a> | </span>'
                      +' </div></td></tr>';
            $("#table-data").prepend(html);
            editExpense();
            $("#cross").click(function(){
                $(this).closest("tr").remove();
             

              
      });
          })
      })
  }
  
  
  function deleteExpense(itemid){
    if(confirm('Are you sure?'))
    {
    var id=itemid;
    var data={
        "id":id
    }
    var dataJson=JSON.stringify(data);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        url:'http://localhost:3000/expense/dlt',
        data:dataJson,
        success:function(response){
            console.log(response.message)
        }
    })
    // location.reload();
  }
  }
  






function editExpense(){
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
        updateExpense(arr)
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
        updateExpense(arr);
		//out put to show
		$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>')
		 

	});
	//--->save whole row entery > end




}

function updateExpense(arr){
        
    var dataJson=JSON.stringify(arr);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        url:'http://localhost:3000/expense/update',
        data: dataJson,
        success: function(response){
        }
    })

}



