const { BrowserWindow, app, globalShortcut } = require("electron");

if (!process.argv[2]) {
  console.error(
    `Usage: floating-hangout [https://hangouts.google.com/path/to/hangout]`
  );
  process.exit(1);
}

const hangoutUrl = process.argv[2];

app.on("ready", () => {
  let win = new BrowserWindow({
    width: 1920,
    height: 1080,
    transparent: true,
    frame: false,
    // opacity:0.5,
    fullscreen: false,
    simpleFullscreen: true,
    alwaysOnTop: true,
    enableLargerThanScreen: true
    // titleBarStyle: "hidden"
  });
  win.show();

  win.on("closed", () => {
    win = null;
  });

  // Load a remote URL
  win.loadURL(hangoutUrl);

  const show = () => {
    win.webContents.executeJavaScript(`
      document.body.style.opacity = 1;
      document.body.style.webkitAppRegion = "drag";
    `);
    win.setIgnoreMouseEvents(false);
  };

  const hide = () => {
    win.webContents.executeJavaScript(`
      document.body.style.backgroundColor = "transparent";
    `);
    // win.webContents.openDevTools();
    win.setBounds({
      x: 0,
      y: 0,
      width: 1920,
      height: 1080
    });
    win.setIgnoreMouseEvents(true);
    win.setAlwaysOnTop(true, "screen-saver");
  };

  let ghosted = false;
  globalShortcut.register("Shift+Ctrl+Option+Command+F", () => {
    if (ghosted) {
      show();
    } else {
      hide();
    }
    ghosted = !ghosted;
  });

  win.webContents.on("dom-ready", () => {
    hide();
  });
});
