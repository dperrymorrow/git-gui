"use strict";
const ipc = require("electron").ipcMain;
const { app, BrowserWindow, shell, Menu } = require("electron");
const menu = require("electron-default-menu")(app, shell);
const storage = require("./storage");
const _ = require("./util/lodash");

app.on("ready", () => {
  storage.loadData().then(data => {
    console.log(data);
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

    let win = new BrowserWindow({
      width: data.window.width,
      height: data.window.height,
      x: data.window.x,
      y: data.window.y,
      minWidth: 1024,
      minHeight: 720,
      title: "Git Gui",
      show: true,
      type: "textured",
      // titleBarStyle: "hidden-inset",
      backgroundColor: "#000000",
      fullscreenable: true,
      closable: true,
      maximizable: true,
      darkTheme: true,
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/workspace/js/index.js`,
        devTools: true,
        textAreasAreResizable: false,
        scrollBounce: true,
        backgroundThrottling: false,
        acceptFirstMouse: false,
        images: true,
        webgl: true,
        webaudio: true,
        plugins: true,
        experimentalFeatures: true,
        experimentalCanvasFeatures: true,
      },
    });

    win.on("closed", () => {
      win = null;
    });

    const winMoved = _.throttle(() => {
      if (win) {
        const bounds = win.getBounds();
        data.window.x = bounds.x;
        data.window.y = bounds.y;
        storage.saveData(data);
      }
    }, 250);

    win.on("moved", winMoved);
    win.on("resize", winMoved);

    win.loadURL(`file://${__dirname}/workspace/index.html`);
  });
});
