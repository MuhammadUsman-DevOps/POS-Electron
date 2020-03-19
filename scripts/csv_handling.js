function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;
    csvFile = new Blob([csv], {type: "text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function export_table_to_csv(html, filename) {
	var csv = [];
	var rows = document.querySelectorAll("table tr");
	
    for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td, th");
		
        for (var j = 0; j < cols.length-1; j++) 
            row.push(cols[j].innerText);
        
		csv.push(row.join(","));		
	}

    download_csv(csv.join("\n"), filename);
}

$("#downloadCSV").on("click", function () {
    var html = document.querySelector("table").outerHTML;
	export_table_to_csv(html, "products.csv");
});


function uploadCSVFile(){
    var fileUpload=document.getElementById("fileUpload");
    var regex= /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if(regex.test(fileUpload.value.toLowerCase())){

        if(typeof(FileReader)!="undefined"){
            var reader=new FileReader();
            reader.onload=function(e){
                var table=document.getElementById("Table");
               var rows=e.target.result.split("\n");
               for(var i=0; i<rows.length;i++){
                   var cells=rows[i].split(",");
                   if(cells.length>1){
                        var row=table.insertRow(-1);
                        for(var j=0; j<cells.length;j++){
                            var cell=row.insertCell(-1);
                            cell.innerHTML=cells[j];
                        }
                   }
               }

            
            }

            reader.readAsText(fileUpload.files[0]);
        }
        else{
            alert("error");
        }
    }
    else{
        alert("upload a valid CSV file")
    }
}


$("#uploadCSV").on('click', function(){
    uploadCSVFile();
})