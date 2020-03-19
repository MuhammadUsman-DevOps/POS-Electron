const electron = require('electron')
const path= require('path')
const BrowserWindow = electron.remote.BrowserWindow
let $ = require('jquery')
const swal = require('sweetalert2')
const ipc = require('electron').ipcRenderer


function loadRegisterWindow()
{
  const modalPath = path.join('file://', __dirname, '../views/Register.html')

  let win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
          nodeIntegration: false
      }

  })

  win.loadURL(modalPath)
  win.show()
  electron.remote.getCurrentWindow().close();
}




//const windows = require('../windows/windows.js')

$(document).ready(function(){
  $("#btn").click(function(){
    let username=$("#username").val()
    let password=$("#password").val()
    makeLogin(username,password)
    setUserStatus(username)
  })
})

function makeLogin(name, pass) {
   
  $.ajax({
  
            method: 'GET',
            url: 'http://localhost:3000/users'
          }).then(function(response){
        
            response.forEach(function(item)  {
                if(item.username===name && item.password===pass)
                {
                 
                    loadRegisterWindow()
                }
                else{
                
                 showErrorToast()
                 
                }
            });

          

          })
  
}

function setUserStatus(username){

  var username=username
  var islogged="true"
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
function showErrorToast()
{
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'error',
    title: 'Inccorect username/password'
  })
}



$('#print-invoice').click(function(event){
  Console.log('click')
ipc.send('print-to-pdf')
})

ipc.on('wrote-pdf', function(e, path){
const message = 'wrote pdf to: ${path}'
console.log(message)
})