import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../../common/routes/routes'
import { uuidv4 } from '../../../../../common/utils/commonUtils'
import { setThemeClassNameOnHTMLTag } from '../../../home/home-page/utils/utils'
import { exportAsImage, shareQuote } from './utils'

export function useCreateQuoteImage(philosopherFullName, share, exportRef) {
    const navigate = useNavigate()

    useEffect(() => {
        setThemeClassNameOnHTMLTag(true)
    }, [])

    useEffect(() => {
        ;(async function () {
            const filename = `${philosopherFullName}-quote-${uuidv4()}.png`
            if (share !== undefined && share === true) {
                await exportAsImage(exportRef.current, filename)
                await shareQuote(exportRef.current, filename)
            } else {
                await exportAsImage(exportRef.current, filename)
            }
            navigate(ROUTES.homepage.route)
        })()
    }, [exportRef, navigate, philosopherFullName, share])
}
