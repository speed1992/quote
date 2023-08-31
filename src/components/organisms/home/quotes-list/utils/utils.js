import { isObjEmpty } from '../../../../../common/utils/commonUtils'
import { removeReadData } from '../../../../../common/utils/staticDataUtils'
import { worker } from '../../../../../common/web-workers/worker'

export const changeQuotesData = ({ currentPhilosopher, currentData, setCurrentData, options }, { markedMode = null, markedQuotes, setMarkedQuotes }) => {
    if (currentData) setCurrentData(currentData)
    if (markedMode !== undefined && markedMode) removeReadData({ currentPhilosopher, markedMode, markedQuotes, setMarkedQuotes, currentData, setCurrentData })
}

export const getPhilosopherFullName = ({ currentPhilosopher, options }) => {
    const currentIndex = options.filter(({ value }) => currentPhilosopher === value)
    if (!isObjEmpty(currentIndex)) return currentIndex && currentIndex[0].fullName
}

export const getPhilosopherFullName_i10n = ({ currentPhilosopher, options }) => {
    const currentIndex = options.filter(({ value }) => currentPhilosopher === value)
    if (!isObjEmpty(currentIndex)) return currentIndex && currentIndex[0].fullNameInOtherLanguages
}

export const searchByWordLength = async (start, end, quotes, { markedMode, markedQuotes, setMarkedQuotes }, { setCurrentData, currentPhilosopher }) => {
    return new Promise((resolve) => {
        if (quotes !== undefined) {
            if (typeof start === 'string' && start.trim() === '') start = 0
            worker.postMessage({ quotes, end, start, filterName: 'wordCountFilter' })
            worker.onmessage = (event) => {
                const newData = JSON.parse(eval(`(${JSON.stringify(event.data)})`))
                changeQuotesData({ currentData: newData, setCurrentData, currentPhilosopher }, { markedMode, markedQuotes, setMarkedQuotes })
                resolve()
            }
        }
    })
}

export function getWordCount(str) {
    return str.split(' ').filter(function (n) {
        return n !== ''
    }).length
}
