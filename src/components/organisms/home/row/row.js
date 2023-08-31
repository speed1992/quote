import React, { Suspense, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'react-simple-snackbar'
import ROUTES from '../../../../common/routes/routes'
import { retryTenTimes } from '../../../../common/utils/apiUtils'
import { isUndefined } from '../../../../common/utils/commonUtils'
import { debounce } from '../../../../common/utils/debounce'
import styles from './styles/row.module.css'
import { evaluateClassNames } from './utils/style-utils'
import { copyURL, rowClickHandler, usePrevious } from './utils/utils'
const MarkAsRead = React.lazy(() => retryTenTimes(() => import('../../tools/mark-as-read/mark-as-read')))
const Translate = React.lazy(() => retryTenTimes(() => import('../../tools/translate/translate')))
const Audio = React.lazy(() => retryTenTimes(() => import('../../tools/audio/audio')))

const Row = ({ data: { searchText, start, end, philosopherFullName, philosopherFullName_i10n, markedMode, currentQuote, currentPhilosopher, markedQuotes, setMarkedQuotes, currentData, setCurrentData, index, scrollPosition, setScrollPosition, listRef, darkMode, scheduledPosts, setScheduledQuotes, rowsRendered, setRowsRendered }, style }) => {
    const prevCurrentPhilosopher = usePrevious(currentPhilosopher)
    const [openSnackbar] = useSnackbar()
    const { quote: quotationText, id: quotationId } = currentQuote
    const propsToSend = { openSnackbar, searchText, start, end, philosopherFullName, index, philosopherFullName_i10n, darkMode }
    const [localTranslateKey, setLocalTranslateKey] = useState(false)
    const debouncedHandler = useCallback(
        debounce(() => setScrollPosition(parseInt(quotationId)), 500),
        []
    )

    if (prevCurrentPhilosopher && prevCurrentPhilosopher !== currentPhilosopher && rowsRendered === false) {
        setRowsRendered(true)
    }

    if (!isUndefined(currentQuote))
        return (
            <div role="row" key={index} className={evaluateClassNames(index)} style={style} onMouseMove={debouncedHandler} onTouchStart={debouncedHandler}>
                <span role="columnheader" style={{ position: 'absolute', top: '10rem' }} className="row">
                    <span onClick={rowClickHandler.bind(this, { quote: quotationText, ...propsToSend })}>{`${index + 1}. "${quotationText}" ― ${philosopherFullName}`}</span>
                </span>
                <div role="columnheader" style={{ position: 'absolute', top: '26rem' }} className="row">
                    {localTranslateKey ? <Translate inputText={quotationText} {...propsToSend} /> : null}
                </div>

                <div role="columnheader" className={styles.actionItems} style={{ position: 'absolute', bottom: '5rem' }}>
                    <button>
                        <Link to={ROUTES.image.route} state={{ quotationText, philosopherFullName, signature: 'Instagram: @philosophizetruth' }} style={{ textDecoration: 'none', color: darkMode ? '#fff' : '#000' }}>
                            Download Image
                        </Link>
                    </button>
                    <Audio index={index} currentData={currentData} scrollPosition={scrollPosition} setScrollPosition={setScrollPosition} listRef={listRef} />
                    {markedMode && (
                        <Suspense fallback={''}>
                            <MarkAsRead index={quotationId} currentPhilosopher={currentPhilosopher} markedQuotes={markedQuotes} setMarkedQuotes={setMarkedQuotes} currentData={currentData} setCurrentData={setCurrentData} setLocalTranslateKey={setLocalTranslateKey} />
                        </Suspense>
                    )}
                    <button onClick={() => setLocalTranslateKey(true)}>Translate</button>
                    <button>
                        <Link to={ROUTES.image.route} state={{ quotationText, philosopherFullName, signature: 'Instagram: @philosophizetruth', share: true }} style={{ textDecoration: 'none', color: darkMode ? '#fff' : '#000' }}>
                            Share Image
                        </Link>
                    </button>
                    <button onClick={() => copyURL(openSnackbar, () => setScrollPosition(parseInt(quotationId)))}>Share Link</button>
                </div>
            </div>
        )
}

export default Row
