import React from 'react'
import { retryTenTimes } from '../utils/apiUtils'

const HomePage = React.lazy(() => retryTenTimes(() => import('../../components/organisms/home/home-page/home-page')))
const QuoteImage = React.lazy(() => retryTenTimes(() => import('../../components/organisms/analysis/generate-quote-image/generateQuoteImage')))
const Report = React.lazy(() => retryTenTimes(() => import('../../components/organisms/analysis/report/report')))

const ROUTES = {
    homepage: {
        route: '/',
        component: HomePage,
    },
    image: {
        route: '/image',
        component: QuoteImage,
    },
    report: {
        route: '/report',
        component: Report,
    },
}

export default ROUTES
