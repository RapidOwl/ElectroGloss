const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Store = require('./app/persistence/store.js');

const store = new Store({
    // We'll call our data file 'user-preferences'
    configName: 'electrogloss-user-preferences',
    defaults: {
        // 800x600 is the default size of our window
        windowBounds: { width: 800, height: 600 }
    }
});

// Get the window bounds from the store.
let { width, height } = store.get('windowBounds');

let mainWindow;

function createWindow() {
    // create the browser window
    mainWindow = new BrowserWindow({ width: width, height: height });
    // render index.html which will contain our root Vue component
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // dereference the mainWindow object when the window is closed
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    mainWindow.on('resize', () => {
        // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
        // the height, width, and x and y coordinates.
        let { width, height } = mainWindow.getBounds();

        // Now that we have them, save them using the `set` method.
        store.set('windowBounds', { width, height });
    });
}

// call the createWindow() method when Electron has finished initializing
app.on('ready', createWindow);

// when all windows are closed, quit the application on Windows/Linux
app.on('window-all-closed', function() {
    // only quit the application on OS X if the user hits cmd + q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // re-create the mainWindow if the dock icon is clicked in OS X and no other
    // windows were open
    if (mainWindow === null) {
        createWindow();
    }
});