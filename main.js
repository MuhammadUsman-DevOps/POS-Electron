const {app, BrowserWindow} = require('electron')
const path = require('path')
const fs = require('fs')
const os = require('os')
const ipc = require('electron').ipcMain
const shell = require('electron').shell

console.log(require.resolve("electron"))

function createWindow()
{
    let win= new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        show: false
    })

    win.loadFile('views/login.html')
    // waiting for rendering
    win.once('ready-to-show', ()=>{
        win.show()
    })

    win.on('closed', () => {
        
        win = null
      })
}




app.on('window-all-closed', () => {
    
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    
    if (win === null) {
      createWindow()
    }
  })

  let server= require('./server/server.js')
  app.on('ready', createWindow)


  ipc.on('print-to-pdf', function(event){
    const pdfPath = path.join(os.tmpdir(),print.pdf)
    const win= BrowserWindow.fromWebContents(event.sender)
    win.webContents.printToPDF({}, function(error, data){
      if(error)
      {
        return Console.log(error.message)
      }
      fs.writeFile(pdfPath, data, function(err){
        if(err)
        {
          return Console.log(err.message)
        }
        shell.openExternal('file://'+pdfPath)
        event.sender.send('write-pdf',pdfPath)
      })
    })
  })