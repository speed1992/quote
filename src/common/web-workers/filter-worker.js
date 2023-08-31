onmessage = function ({ data }) {
    const { filterName } = data
    if (filterName === 'searchTermFilter') {
        const { currentData, searchText } = data

        let filteredQuotes = currentData.filter(({ quote }) => {
            if (quote.toLowerCase().indexOf(searchText.toLowerCase()) < 0) {
                return false
            } else {
                return true
            }
        })
        this.postMessage(JSON.stringify(filteredQuotes))
    }
    if (filterName === 'wordCountFilter') {
        const { quotes, end, start } = data
        const result = quotes.filter(({ quote }) => {
            const wordCount = quote.split(' ').filter(function (n) {
                return n !== ''
            }).length

            if (end && end !== '') {
                if (wordCount >= start && wordCount <= end) {
                    return true
                }
            }
            if (end === '') {
                if (wordCount >= start) {
                    return true
                }
            }

            return false
        })
        this.postMessage(JSON.stringify(result))
    }
}
