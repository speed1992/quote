import { changeQuotesData, searchByWordLength } from '../../components/organisms/home/quotes-list/utils/utils.js'
import { search } from './utils.js'

export async function applyFilters({ searchText, start, end, currentPhilosopher, currentData, originalData, setCurrentData, options }, { markedMode = false, markedQuotes, setMarkedQuotes }) {
    let dataForSearch = []
    if (searchText === '' && start == 1 && end == '') changeQuotesData({ currentPhilosopher, currentData: originalData, setCurrentData, options }, { markedMode, markedQuotes, setMarkedQuotes })
    else {
        dataForSearch = await search({ searchText, currentData: originalData, setCurrentData, currentPhilosopher, options })
        if (dataForSearch) await searchByWordLength(start, end, dataForSearch, { markedMode, markedQuotes, setMarkedQuotes }, { currentData, setCurrentData, originalData, currentPhilosopher })
    }
}
