const { app, BrowserWindow, screen, Tray, Menu } = require("electron");
const path = require("path");
const iconPath = path.join(__dirname, "src/clock.png");

let tray = null;

function createWindow() {
	let display = screen.getPrimaryDisplay();
	let w = display.bounds.width;

	const win = new BrowserWindow({
		width: 300,
		height: 300,
		frame: false,
		transparent: true,
		x: w - 300,
		y: 0,
		skipTaskbar: true,
	});

	win.loadFile("src/index.html");
}

function createSettingsWindow() {
	const win = new BrowserWindow({
		width: 400,
		height: 400,
		autoHideMenuBar: true,
	});

	win.loadFile("src/settings.html");
}

function createTray() {
	const contextMenu = Menu.buildFromTemplate([
		{
			label: "Settings",
			click() {
				createSettingsWindow();
			},
		},
		{
			type: "separator",
		},
		{
			label: "Exit",
			click() {
				app.quit();
			},
		},
	]);

	tray = new Tray(iconPath);
	tray.setToolTip("Clock widget");
	tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
	createWindow();
	createTray();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
