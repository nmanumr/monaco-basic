const { BrowserWindow, app } = require('electron')

app.on('ready', function() {
    let win = new BrowserWindow({ width: 800, height: 600 });
    win.on('closed', () => {
        win = null
    })

    win.loadURL(`file://${__dirname}/test.html`);


})