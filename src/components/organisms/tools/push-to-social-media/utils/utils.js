export const schedulePost = ({ index, currentPhilosopher, scheduledPosts = {}, setScheduledQuotes }) => {
    let newScheduledPosts = JSON.parse(JSON.stringify(scheduledPosts))
    let readQuotesArray = []

    if (scheduledPosts && scheduledPosts[currentPhilosopher] !== undefined) {
        readQuotesArray = [...readQuotesArray, ...scheduledPosts[currentPhilosopher]]
    }

    readQuotesArray = [...new Set(readQuotesArray)]

    if (index) {
        readQuotesArray.push(index)
    }

    newScheduledPosts[currentPhilosopher] = readQuotesArray
    setScheduledQuotes(newScheduledPosts)
}
