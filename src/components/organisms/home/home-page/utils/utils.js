import { getPhilosopherData } from '../../../../../common/static/utils/utils'
import { getUserDetails, sendUserDetails } from '../../mobile/mobile-menu/utils/utils'

export const setThemeClassNameOnHTMLTag = (value) => {
    var root = document.getElementsByTagName('html')[0]
    root.className = ''
    if (value) {
        root.classList.add('darkTheme')
    } else {
        root.classList.add('lightTheme')
    }
}

export const bringIntoOriginalOrder = (originalOptions, newOptions) => originalOptions.map((item) => getPhilosopherData({ philosopher: item.value, options: newOptions })).reverse()

export const bringIntoAlphabeticalOrder = (options) => [...options].sort((a, b) => a.fullName.localeCompare(b.fullName))

export function getClientSyncDates(syncDate) {
    let currentClientDate = new Date()
    let lastSyncClientDate = new Date(syncDate)

    currentClientDate.setHours(0, 0, 0, 0)
    currentClientDate = currentClientDate.getTime()

    lastSyncClientDate = lastSyncClientDate.setHours(0, 0, 0, 0)
    return { currentClientDate, lastSyncClientDate }
}

export async function compareWithServerSyncDatesAndMakeAnAPICall(userName, markedQuotes, openSnackbar, setMarkedQuotes, setSyncDate, markedQuoteClientCount, currentClientDate) {
    let { markedQuotesFromServer, dateFromServer } = await getUserDetails({ userName, markedQuotes, openSnackbar, setMarkedQuotes })
    setSyncDate(Date.now())
    if (markedQuotesFromServer) {
        const markedQuotesFromServerCount = Object.values(markedQuotesFromServer).flat().length
        if (markedQuotesFromServerCount > markedQuoteClientCount) {
            setMarkedQuotes(markedQuotesFromServer)
            openSnackbar('Auto-Sync : Restored all marked quotes!', 4000)
        } else if (markedQuoteClientCount > markedQuotesFromServerCount) {
            dateFromServer = new Date(dateFromServer)
            dateFromServer.setHours(0, 0, 0, 0)
            if (currentClientDate > dateFromServer) {
                await sendUserDetails({ userName, markedQuotes, openSnackbar })
            }
        }
    }
}
