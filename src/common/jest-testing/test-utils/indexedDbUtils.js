import Dexie from 'dexie'
import indexedDB from 'fake-indexeddb'
import { initDBstate } from '../mocks/state.js'

export function addItem(db) {
    const item = initDBstate
    const tx = db.transaction('myDB', 'readwrite')
    const store = tx.objectStore('myDB')
    store.add(item, 'persist:root')
}

export const dbInit = () => {
    return new Promise((resolve, reject) => {
        Dexie.dependencies.indexedDB = indexedDB

        const openRequest = indexedDB.open('myDB', 2)
        let db

        openRequest.onupgradeneeded = function (e) {
            db = e.target.result
            db.createObjectStore('myDB')
        }

        openRequest.onerror = (event) => {
            reject()
            console.error(`Database error: ${event.target.errorCode}`)
        }

        openRequest.onsuccess = (event) => {
            addItem(db)
            resolve()
        }
    })
}
