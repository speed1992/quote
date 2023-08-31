import React, { useEffect } from 'react'
import { getPhilosopherQuotes, lazyLoadAsset } from '../../../../common/static/utils/utils'
import { retryTenTimes } from '../../../../common/utils/apiUtils'
const Loader = React.lazy(() => retryTenTimes(() => import('../../../../common/components/loader/loader')))
const QuotesList = React.lazy(() => retryTenTimes(() => import('../quotes-list/quotes-list')))

export function LazyLoadQuoteList(props) {
    const { currentPhilosopher, setCurrentData, options, setOptions, setQuotesLoaded, isFetching, setIsFetching } = props

    async function lazyInit() {
        try {
            if (currentPhilosopher !== undefined) {
                const currentPhilosopherQuotes = getPhilosopherQuotes({ philosopher: currentPhilosopher, options })
                if (!currentPhilosopherQuotes) {
                    setIsFetching(true)
                    await lazyLoadAsset(currentPhilosopher, { options, setOptions }, setQuotesLoaded, [setCurrentData])
                }
            }

            setIsFetching(false)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        lazyInit()
    }, [currentPhilosopher])

    return isFetching ? <Loader /> : <QuotesList {...props} />
}
