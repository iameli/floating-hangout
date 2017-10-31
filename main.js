const { BrowserWindow, app, globalShortcut } = require('electron')

if (!process.argv[2]) {
  console.error(`Usage: floating-hangout [https://hangouts.google.com/path/to/hangout]`);
  process.exit(1);
}

const hangoutUrl = process.argv[2];

app.on("ready", () => {
  let win = new BrowserWindow({
    width: 800,
    height: 800,
    transparent: true,
    // frame: false,
    // opacity:0.5,
    alwaysOnTop: true,
    titleBarStyle: "hidden-inset"
  })
  win.show()

  win.on('closed', () => {
    win = null
  })

  // Load a remote URL
  win.loadURL(hangoutUrl);

  const show = () => {
    win.webContents.executeJavaScript(`
      document.body.style.opacity = 1;
      document.body.style.backgroundColor = "black";
      document.body.style.webkitAppRegion = "drag";
    `);
    win.setIgnoreMouseEvents(false);
  }

  const hide = () => {
    win.webContents.executeJavaScript(`
      document.body.style.opacity = 0.75;
      document.body.style.backgroundColor = "transparent";
    `);
    win.setIgnoreMouseEvents(true);
  }

  let ghosted = false;
  globalShortcut.register("Shift+Ctrl+Option+Command+F", () => {
    if (ghosted) {
      show();
    }
    else {
      hide();
    }
    ghosted = !ghosted;
  });

  win.webContents.on('dom-ready', () => {
    show();
  });
});
