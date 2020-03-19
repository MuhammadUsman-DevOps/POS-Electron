const electron = require('electron')
const BrowserWindow= electron.remote.BrowserWindow
const path= require('path')
const url= require('url')


module.exports={
 loadRegisterWindow: function() {
    let RegisterWindow= new BrowserWindow({
        width:800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: false
        },
        show: false
    })
    RegisterWindow.loadURL(url.format({
        pathname: path.join(__dirname,'../views/Register.html'),
        protocol: 'file:', 
        slashes: true 
    }))

    RegisterWindow.once('ready-to-show', ()=>{
        RegisterWindow.show()
    })

   
}

}
