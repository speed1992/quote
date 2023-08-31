export const cleanMarkedQuotes = (markedQuotes, quotes) => {
    let newMarkedQuotes = []
    markedQuotes.forEach((markedId) => {
        const doesMarkedQuoteExist = quotes.find((quotationObj) => markedId === quotationObj.id)
        if (doesMarkedQuoteExist) newMarkedQuotes.push(markedId)
    })
    return newMarkedQuotes
}
