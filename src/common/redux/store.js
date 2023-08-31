import { configureStore } from '@reduxjs/toolkit'
import { getPersistConfig } from 'redux-deep-persist'
import { persistReducer, persistStore } from 'redux-persist'
import DBstorage from 'redux-persist-indexeddb-storage'
import getStoredState from 'redux-persist/es/getStoredState'
import storage from 'redux-persist/lib/storage'
import philosophersDataReducer from '../../components/organisms/home/home-page/homePageRedux/homePageRedux'
import { querySync } from '../settings/redux-query-sync'
import { getPhilosopherObjectIndex, getPhilosopherQuotes } from '../static/utils/utils'
import { PHILOSOPHER_TO_PURGE } from './purgeCache'
import { cleanMarkedQuotes } from './utils/migrationUtils'

const persistConfig = getPersistConfig({
    key: 'root',
    storage,
    blacklist: ['currentData', 'originalData', 'options', 'quotesLoaded'],
    rootReducer: philosophersDataReducer,
})

const newPersistConfig = getPersistConfig({
    key: 'root',
    storage: DBstorage('myDB'),
    blacklist: ['currentData', 'originalData', 'quotesLoaded', 'currentPhilosopher'],
    rootReducer: philosophersDataReducer,
    migrate: async (state) => {
        if (state === undefined) {
            const asyncState = await getStoredState(persistConfig)
            return asyncState
        } else {
            if (getPhilosopherQuotes({ philosopher: PHILOSOPHER_TO_PURGE, options: state?.options })) {
                const index = getPhilosopherObjectIndex(PHILOSOPHER_TO_PURGE, state.options)
                if (state.options[index]?.quotes?.length !== 2511) {
                    const cleanedMarkedQuotes = cleanMarkedQuotes(state.markedQuotes[PHILOSOPHER_TO_PURGE], state.options[index]?.quotes)
                    localStorage.removeItem('DOSTOEVSKY-MARKED_AS_READ')
                    state.markedQuotes[PHILOSOPHER_TO_PURGE] = cleanedMarkedQuotes
                    state.currentData = []
                    delete state.originalData
                    delete state.options[index]?.quotes
                    // delete state.markedQuotes[PHILOSOPHER_TO_PURGE]
                    if (state.currentPhilosopher === PHILOSOPHER_TO_PURGE) {
                        state.currentPhilosopher = 'NIETZSCHE'
                    }
                }
            }
            return state
        }
    },
})

export const philosophersDataSlice = persistReducer(newPersistConfig, philosophersDataReducer)

export const store = configureStore({
    reducer: {
        philosophersData: philosophersDataSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
})

querySync()

export const persistor = persistStore(store)
