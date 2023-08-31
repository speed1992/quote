import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { retryTenTimes } from '../../../../common/utils/apiUtils'
import { useCreateQuoteImage } from './utils/hooks'
const QuoteWithImage = React.lazy(() => retryTenTimes(() => import('../quote-with-image/quote-with-image')))
const QuoteWithoutImage = React.lazy(() => retryTenTimes(() => import('../quote-without-image/quote-without-image')))

const GenerateQuoteImage = () => {
    let {
        state: { quotationText, philosopherFullName, signature, share = false },
    } = useLocation()
    const exportRef = useRef()
    const currentPhilosopher = useSelector((state) => state.philosophersData.currentPhilosopher)

    const propsToSend = { exportRef, quotationText, philosopherFullName, signature }

    useCreateQuoteImage(philosopherFullName, share, exportRef)

    try {
        const imageName = `${currentPhilosopher}.jpg`
        require('../../../../common/static/assets/images/philosophers/' + imageName)
        return <QuoteWithImage {...propsToSend} imageName={imageName} />
    } catch (error) {
        return <QuoteWithoutImage {...propsToSend} />
    }
}

export default GenerateQuoteImage
