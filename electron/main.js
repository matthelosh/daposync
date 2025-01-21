if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import db from './database.js'

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
    // console.log('\n[API Request]', new Date().toISOString())
    // console.log('URL:', url)
    // console.log('Method:', options.method || 'GET')
    // console.log('Headers:', JSON.stringify(options.headers || {}, null, 2))
    if (options.body) console.log('Body:', options.body)
    
    try {
        // console.log('\n[Sending Request...]')
        const response = await fetch(url, options)
        // console.log('Response Status:', response.status)
        // console.log('Response Headers:', JSON.stringify(Object.fromEntries([...response.headers]), null, 2))
        
        const data = await response.json()
        // console.log('Response Data:', JSON.stringify(data, null, 2))
        return { success: true, data }
    } catch (error) {
        console.error('\n[API Error]')
        console.error('Error Message:', error.message)
        console.error('Stack Trace:', error.stack)
        return { success: false, error: error.message }
    }
}

async function syncRapor(url, payload = {}) {
    // console.log('\n[Sync Rapor Request]', new Date().toISOString())
    // console.log('URL:', url)
    // console.log('Payload:', JSON.stringify(payload, null, 2))
    
    try {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'X-CLIENT-TOKEN': '$2y$12$u/RSPd/5FSiJwUz7OBJZKeXrMPl96gHHAaU0kS1FetlEs6JnvBdMO'
            },
            ...payload
        }
        
        // console.log('Options:', JSON.stringify(defaultOptions, null, 2))
        // console.log('\n[Sending Sync Request...]')
        
        const response = await fetch(url, defaultOptions)
        // console.log('Response Status:', response.status)
        // console.log('Response Headers:', JSON.stringify(Object.fromEntries([...response.headers]), null, 2))
        
        const data = await response.json()
        // console.log('Response Data:', JSON.stringify(data, null, 2))
        return { success: true, data}
    } catch (error) {
        console.error('\n[Sync Error]')
        console.error('Error Message:', error.message)
        console.error('Stack Trace:', error.stack)
        return { success: false, error: error.message }
    }
}

// IPC Handlers

ipcMain.handle('reload-window', () => {
    mainWindow.reload();
})

ipcMain.handle('fetch-data', async (event, { url, method = 'GET', body = null, headers = null }) => {
    // console.log(headers)
    const options = {
        method,
        ...(body && { body: JSON.stringify(body)}),
        headers
    }
    return await handleApiRequest(url, options)
})

ipcMain.handle('sync-rapor', async(event, {url, method = 'POST', body = null }) => {
    console.log(url)
    const options = {
        method,
        body
    }
    const result = await syncRapor(url,options)
    return result
} )

ipcMain.handle('check-connection', async(event, { url, method = 'GET'}) => {
    try {

        const result = await fetch(url, {mode: 'no-cors', method:'GET'})
        console.log(result.status)
        return {
            status: result.status,
            success: result.statusText
        }
    } catch(err) {
        return {
            status: 400,
            success: false
        }
    }
})

ipcMain.on('toMain', (event, data) => {
    mainWindow.webContents.send('fromMain', 'Received in main: ' + data)
})

// Database Handler
ipcMain.handle('database', async(event, queryObjects, params) => {
    try {
        const statement = db.prepare(query)
        return statement.run(params)
    } catch (error) {
        console.error('Database Error:', error)
        throw error
    }
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

app.on('will-quit', () => {
    db.close()
})

