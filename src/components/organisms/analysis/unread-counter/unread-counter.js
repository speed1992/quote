import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPhilosopherQuotes } from '../../../../common/static/utils/utils'
import { isUndefined } from '../../../../common/utils/commonUtils'

function UnreadCounter({ isFetching, isFetchingOptions, markedQuotes, currentPhilosopher }) {
    const [quoteCounts, setQuoteCounts] = useState({ totalQuoteCount: 'NA', readCount: 'NA', unreadCount: 'NA' })
    const options = useSelector((state) => state.philosophersData.options)
    const originalData = getPhilosopherQuotes({ philosopher: currentPhilosopher, options })

    useEffect(() => {
        if (!isFetching && !isFetchingOptions) {
            const totalQuoteCount = originalData?.length
            const readCount = isUndefined(markedQuotes[currentPhilosopher]) ? 0 : markedQuotes[currentPhilosopher].length
            const unreadCount = totalQuoteCount - readCount

            setQuoteCounts({ totalQuoteCount, readCount, unreadCount })
        }
    }, [currentPhilosopher, isFetching, isFetchingOptions, markedQuotes, originalData?.length])

    const { totalQuoteCount, readCount, unreadCount } = quoteCounts

    return (
        <>
            {!isFetching && originalData && (
                <span>
                    Total: {totalQuoteCount} Read: {readCount} Unread: {unreadCount}
                </span>
            )}
        </>
    )
}

export default UnreadCounter
