const { contextBridge, ipcRenderer } = require('electron')

const validChannels = ['fetch-data', 'api-request', 'toMain', 'fromMain', 'sync-rapor', 'check-connection']

contextBridge.exposeInMainWorld('api', {
    reload: () => ipcRenderer.invoke('reload-window'),
    send: (channel, data) => {
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    receive: (channel, func) => {
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
    },
    invoke: async (channel, data) => {
        // console.log(data)
        if (validChannels.includes(channel)) {
            const result = await ipcRenderer.invoke(channel, data)
            return result
        }
        throw new Error(`Invalid channel: ${channel}`)
    },
})

contextBridge.exposeInMainWorld('db', {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args)
})
