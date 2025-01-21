import path from 'path'
import { app } from 'electron'
import Database from 'better-sqlite3'

const isDevelopment = process.env.NODE_ENV === 'development'

const dbPath = isDevelopment 
                ? path.join(process.cwd(), 'database.sqlite') 
                : path.join(app.getAppPath('userData'), 'database.sqlite')

const db = new Database(dbPath, {
    verbose: console.log
})

db.pragma('foreign_keys = ON')

export default db