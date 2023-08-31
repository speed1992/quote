import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { getPersistConfig } from 'redux-deep-persist'
import DBstorage from 'redux-persist-indexeddb-storage'
import getStoredState from 'redux-persist/es/getStoredState'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import philosophersDataReducer from '../../../components/organisms/home/home-page/homePageRedux/homePageRedux'
import { PHILOSOPHER_TO_PURGE } from '../../redux/purgeCache'
import { getPhilosopherData, getPhilosopherObjectIndex } from '../../static/utils/utils'
import { dbInit } from './indexedDbUtils'

export async function renderWithProviders(ui, { indexedDBStorage } = {}) {
    await dbInit()

    const persistConfig = getPersistConfig({
        key: 'root',
        storage,
        blacklist: ['currentData', 'originalData', 'options', 'quotesLoaded'],
        rootReducer: philosophersDataReducer,
    })

    const newPersistConfig = getPersistConfig({
        key: 'root',
        storage: DBstorage('myDB'),
        blacklist: ['currentData', 'originalData', 'quotesLoaded'],
        rootReducer: philosophersDataReducer,
        migrate: async (state) => {
            if (state === undefined) {
                const asyncState = await getStoredState(persistConfig)
                return asyncState
            } else {
                if (getPhilosopherData({ philosopher: PHILOSOPHER_TO_PURGE, options: state.options })) {
                    const index = getPhilosopherObjectIndex(PHILOSOPHER_TO_PURGE, state.options)

                    state.options.splice(index, 1)
                    delete state.markedQuotes[PHILOSOPHER_TO_PURGE]
                    if (state.currentPhilosopher === PHILOSOPHER_TO_PURGE) {
                        state.currentPhilosopher = 'NIETZSCHE'
                    }
                }
                return state
            }
        },
    })

    const philosophersDataSlice = persistReducer(newPersistConfig, philosophersDataReducer)

    const store = configureStore({
        reducer: {
            philosophersData: philosophersDataSlice,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
        devTools: process.env.NODE_ENV !== 'production',
    })

    const persistor = persistStore(store)

    return render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {ui}
            </PersistGate>
        </Provider>
    )
}
