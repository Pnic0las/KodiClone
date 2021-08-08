const {
    app,
    BrowserWindow,
    ipcMain,
    net
} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

const storage = require("electron-json-storage");
const urlmodule = require('url');
const { session } = require('electron');
var querystring = require('querystring');
const widevine = require('electron-widevinecdm');
const {
    FETCH_DATA_FROM_STORAGE,
    SAVE_DATA_IN_STORAGE,
    HANDLE_FETCH_DATA_FROM_STORAGE,
    HANDLE_SAVE_DATA_IN_STORAGE,
    HANDLE_SPOTIFY_REQUEST,
    REMOVE_DATA_FROM_STORAGE,
    HANDLE_TWITCH
} = require("../src/utils/constants")

let mainWindow;
let spotifyWindow;

let width = 1280;
let height = 720;

function getBounds() {
    storage.get("windowBounds", function (error, data) {
        if (data.width || data.height) {
            width = data.width;
            height = data.height;
        }
        createWindow();
        launchLocalServer();
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        show: false,
        webPreferences: {
            webSecurity: true,
            nodeIntegration: true,
            enableRemoteModule: true,
            plugins: true
        }
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    console.log(startURL);
    mainWindow.loadURL(startURL);
    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on("resize", () => {
        let { width, height } = mainWindow.getBounds();
        console.log("RESIZE ", width);
        storage.set("windowBounds", { width, height })
    })
}

function launchLocalServer() {
    const http = require('http')
    const express = require('express')
    const expressApp = express()
    const cors = require('cors')
    const router = express.Router();

    expressApp.use(cors())

    router.get('/file/', function (req, res) {
        let filename = req.query.path
        res.sendFile(filename)
    })

    expressApp.use('/', router)

    http.createServer(expressApp).listen(8000)

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}



ipcMain.on(REMOVE_DATA_FROM_STORAGE, (event, arg) => {
    storage.remove(arg);
    console.log("REMOVE => ", arg);
})

ipcMain.on(FETCH_DATA_FROM_STORAGE, (event, arg) => {
    //Grab data from storage

    storage.get(arg, function (error, data) {
        if (error) {
            mainWindow.send(HANDLE_FETCH_DATA_FROM_STORAGE, {
                success: false,
                message: 'Cannot get data',
            });
        } else {
            mainWindow.send(HANDLE_FETCH_DATA_FROM_STORAGE, {
                success: true,
                message: 'Data returned',
                data: data
            });
        }
    })

});

ipcMain.on(SAVE_DATA_IN_STORAGE, (event, arg) => {
    //Save data from storage
    console.log("IN SAVE MAIN", arg);
    storage.set(arg.name, arg.data);
    mainWindow.send(HANDLE_SAVE_DATA_IN_STORAGE, {
        success: true,
        message: 'Saved',
        data: arg
    });
});

ipcMain.on(HANDLE_SPOTIFY_REQUEST, (event, arg) => {
    console.log("SPOTIFY REQUEST");

    spotifyWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: false
        }
    });

    var scopes = 'user-read-private user-read-email user-modify-playback-state streaming user-read-playback-state';
    var clientId = "097568d4468e4c8582fef642843040eb";
    var clientSecret = "40cc72a07f464c91ab40b6f7ca4e78d4";
    var redirect_uri = "http://localhost/spotify/callback";

    var authURL = 'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri)

    spotifyWindow.loadURL(authURL);
    spotifyWindow.show();

    const filter = {
        urls: [redirect_uri + '*']
    };

    session.defaultSession.webRequest.onBeforeRequest(filter, function (details, callback) {
        const url = details.url;
        var queryData = urlmodule.parse(url, true).query;

        if (queryData.code) {
            var code = queryData.code;
            console.log("code =", code);
            spotifyWindow.close()
            spotifyWindow = null;
            getToken(code);

        } else {
            console.log("Spotify error");
            spotifyWindow = null;
        }
        callback({
            cancel: false
        });
    });

    spotifyWindow.on('closed', function () {
        spotifyWindow = null;
    });

    function getToken(code) {
        console.log("GET TOKEN");
        const url = "https://accounts.spotify.com/api/token"
        const data = querystring.stringify({
            "grant_type": 'authorization_code',
            "code": code,
            "redirect_uri": redirect_uri,
            "client_id": clientId,
            "client_secret": clientSecret,
        });
        const request = net.request({
            method: "POST",
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        let body = ''
        request.on('response', (response) => {
            response.on('data', (chunk) => {
                body += chunk
            })
            response.on('end', () => {
                console.log(`FINAL BODY: ${body}`);
                const data = JSON.parse(body);
                storage.set("spotify_token", data);
                mainWindow.send(HANDLE_SAVE_DATA_IN_STORAGE, {
                    success: true,
                    message: 'Saved token',
                    data: data
                });
            });
        })
        console.log(data.length);
        request.write(data);
        request.end();
    }
})

ipcMain.on(HANDLE_TWITCH, (event, arg) => {
    console.log("Twitch REQUEST");

    TwitchWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: false
        }
    });


    var authURL = 'https://id.twitch.tv/oauth2/authorize' +
        '?client_id=xi9il1cckitjsxwcbbh1dlcoz9fm81' +
        '&redirect_uri=http://localhost/Twitch/callback' +
        '&response_type=token' +
        '&scope=&scope=user:edit+user:read:email'

    TwitchWindow.loadURL(authURL);
    TwitchWindow.show();

    const filter = {
        urls: ["http://localhost/Twitch/callback" + '*']
    };

    session.defaultSession.webRequest.onBeforeRequest(filter, function (details, callback) {
        const url = details.url;
        var queryData = urlmodule.parse(url, true).query;

        console.log(url);
        var accesstoken = url.split('=')[1].split('&')[0]
        console.log("new access token ->", accesstoken)
        storage.set("Twitch_token", { accesstoken: accesstoken });
        mainWindow.send(HANDLE_SAVE_DATA_IN_STORAGE, {
            success: true,
            message: 'Twitch Saved',
            data: accesstoken
        });
        TwitchWindow.close();

        // if (queryData.code) {
        //     var code = queryData.code;
        //     console.log("code =", code);
        //     TwitchWindow.close()
        //     TwitchWindow = null;
        //     getToken(code);

        // } else {
        //     console.log("KOUNIA error");
        //     TwitchWindow = null;
        // }
        callback({
            cancel: false
        });
    });

})
widevine.load(app);
app.on('ready', getBounds);