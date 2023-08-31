import reduxQuerySync from 'redux-query-sync'
import INITIAL_STATE from '../../components/organisms/home/home-page/homePageRedux/initialState'
import { store } from '../redux/store'

export function querySync() {
    reduxQuerySync({
        store, // your Redux store
        params: {
            currentPhilosopher: {
                // The selector you use to get the destination string from the state object.
                selector: (state) => state?.philosophersData?.currentPhilosopher,
                // The action creator you use for setting a new destination.
                action: (value) => {
                    if (value) return { type: 'philosophersData/setCurrentPhilosopherRedux', payload: value }
                    return { type: 'philosophersData/setCurrentPhilosopherRedux', payload: INITIAL_STATE.currentPhilosopher }
                },
            },
            scrollPosition: {
                selector: (state) => {
                    const scrollPos = state.philosophersData.scrollPosition[state.philosophersData.currentPhilosopher]
                    return scrollPos !== undefined && scrollPos !== 'undefined' && !isNaN(scrollPos) ? scrollPos : 1
                },
                action: (value) => {
                    if (value && !isNaN(value)) return { type: 'philosophersData/setScrollPositionRedux', payload: value }
                    return { type: 'philosophersData/setScrollPositionRedux', payload: 1 }
                },

                defaultValue: INITIAL_STATE.scrollPosition,
            },
        },
        // Initially set the store's state to the current location.
        initialTruth: 'location',
        defaultState: INITIAL_STATE,
    })
}
