export const STATIC_OPTIONS = [
    {
        value: 'NIETZSCHE',
        fullName: 'Friedrich Nietzsche',
        fullNameInOtherLanguages: {
            hi: 'फ्रेडरिक नीत्शे',
        },
    },
]
let INITIAL_STATE = {
    currentPhilosopher: 'NIETZSCHE',
    start: 1,
    end: '',
    searchText: '',
    markedMode: false,
    markedQuotes: {},
    currentData: [],
    userName: '',
    password: '',
    sorting: 'alphabetical',
    originalOptions: STATIC_OPTIONS,
    options: STATIC_OPTIONS,
    quotesLoaded: false,
    darkMode: false,
    voiceSpeed: 0.5,
    scrollPosition: {},
    scheduledPosts: {},
    syncDate: 46190630,
}

export default INITIAL_STATE
