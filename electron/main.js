if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import fetch from 'node-fetch'
import https from 'https'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow;
function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        show: false,
        backgroundColor: '#111827',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, './preload.js')
        }
    })

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    if (process.env.ELECTRON === 'true') {
        mainWindow.loadURL('http://localhost:5173')
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
    }
}

// const httpsAgent = new https.Agent({
//     rejectUnauthorized: false,
//     secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
// });

// Handle API Request
async function handleApiRequest(url, options = {}) {
    try {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer QteRgcGaC8TGojF'
            },
            ...options
        }
        const response = await fetch(url, defaultOptions)
        const data = await response.json()
        return { success: true, data }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

async function syncRapor(url, payload = {}) {
    try {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json'
            },
            ...payload
        }

        const response = await fetch(url, defaultOptions)
        const data = await response.json()
        return { success: true, data}
    } catch (error) {
        return { success: false, error: error.message }
    }
}

// IPC Handlers
ipcMain.handle('fetch-data', async (event, { url, method = 'GET', body = null }) => {
    const options = {
        method,
        ...(body && { body: JSON.stringify(body)})
    }
    return await handleApiRequest(url, options)
})

ipcMain.handle('sync-rapor', async(event, {url, method = 'POST', body = null }) => {
    const options = {
        method,
        body
    }
    const result = await syncRapor(url,options)
    return result
} )

ipcMain.on('toMain', (event, data) => {
    mainWindow.webContents.send('fromMain', 'Received in main: ' + data)
})

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

