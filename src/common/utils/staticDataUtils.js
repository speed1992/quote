import { getStorageValue } from './localStorageUtils'

export const removeReadData = ({ index, currentPhilosopher, markedMode, markedQuotes = {}, setMarkedQuotes, currentData, setCurrentData }) => {
    let newMarkedQuotes = JSON.parse(JSON.stringify(markedQuotes))
    let readQuotesArray = []

    const READ_ARRAY_LOCALSTORAGE_KEY = `${currentPhilosopher}-MARKED_AS_READ`
    readQuotesArray = getStorageValue(READ_ARRAY_LOCALSTORAGE_KEY, [])

    if (markedQuotes && markedQuotes[currentPhilosopher] !== undefined) {
        readQuotesArray = [...readQuotesArray, ...markedQuotes[currentPhilosopher]]
    }

    readQuotesArray = [...new Set(readQuotesArray)]

    if (index) {
        readQuotesArray.push(index)
    }

    newMarkedQuotes[currentPhilosopher] = readQuotesArray
    setMarkedQuotes(newMarkedQuotes)

    const newData = currentData.filter(({ id }, _) => readQuotesArray.indexOf(id) === -1)
    setCurrentData(JSON.parse(JSON.stringify(newData)))
}
