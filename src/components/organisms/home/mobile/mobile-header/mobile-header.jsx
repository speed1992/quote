import React, { Suspense, useState } from 'react'
import { retryTenTimes } from '../../../../../common/utils/apiUtils'
import Select from '../../../tools/select/select'
import { WordLengthSearch } from '../../../tools/wordLengthSearch/wordLengthSearch'
import { onFocusHandler, onPhilosopherSelectChange } from '../../desktop/desktop-header/utils/utils'
const MobileMenu = React.lazy(() => retryTenTimes(() => import('../mobile-menu/mobile-menu')))
const Breadcrumb = React.lazy(() => retryTenTimes(() => import('../../../analysis/breadcrumb/breadcrumb')))
const UnreadCounter = React.lazy(() => retryTenTimes(() => import('../../../analysis/unread-counter/unread-counter')))
const QuotesFound = React.lazy(() => retryTenTimes(() => import('../../../analysis/quotes-found/quotes-found')))

function MobileHeader({ listRef, setSearchText, searchText, start, end, setStart, setEnd, isFetching, setIsFetching, markedMode, setMarkedMode, markedQuotes, currentData, setCurrentData, currentPhilosopher, originalData, setCurrentPhilosopher, options, setOptions, setQuotesLoaded, darkMode, setDarkMode, setSorting, sorting, isFetchingOptions, setIsFetchingOptions, originalOptions, setOriginalOptions, userName, setUserName, setMarkedQuotes, isLoggedIn, setIsLoggedIn, password, setPassword, scrollPosition, setRowsRendered }) {
    const propsToSend = { start, end, setStart, setEnd, setSearchText, setCurrentData }
    const [visible, toggleVisible] = useState(false)

    return (
        <div className="header">
            <div className="mobile-column">
                {visible && (
                    <Suspense fallback={''}>
                        <MobileMenu markedMode={markedMode} setMarkedMode={setMarkedMode} visible={visible} options={options} setOptions={setOptions} toggleVisible={toggleVisible} darkMode={darkMode} setDarkMode={setDarkMode} setSorting={setSorting} sorting={sorting} userName={userName} setUserName={setUserName} setMarkedQuotes={setMarkedQuotes} {...{ isLoggedIn, setIsLoggedIn, password, setPassword, setIsFetching }} />
                    </Suspense>
                )}
                <div style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }} onClick={() => toggleVisible(!visible)}>
                    ☰
                </div>
            </div>
            <div className="mobile-column">
                <WordLengthSearch isMobile={true} listRef={listRef} {...propsToSend} />
            </div>
            <div className="mobile-column">
                <input data-testid="search-text" className="wordSearch" type="text" placeholder="Search word" value={searchText} onChange={({ target: { value } }) => setSearchText(value)} />
            </div>
            <div className="mobile-column">
                <Select isMobile={true} isFetchingOptions={isFetchingOptions} options={options} currentPhilosopher={currentPhilosopher} onFocusHandlerCallback={() => onFocusHandler({ options, setOptions, isFetchingOptions, setIsFetchingOptions, originalOptions, setOriginalOptions, sorting })} onChangeHandler={({ target: { value: philosopher } }) => onPhilosopherSelectChange({ philosopher, listRef, setIsFetching, setStart, setEnd, setSearchText, setCurrentPhilosopher, setCurrentData, options, setOptions, setQuotesLoaded, scrollPosition, setRowsRendered })} />
            </div>
            <Suspense fallback={''}>
                <Breadcrumb>
                    <QuotesFound markedMode={markedMode} found={currentData.length} />
                    {markedMode && <UnreadCounter isFetching={isFetching} currentData={currentData} originalData={originalData} markedQuotes={markedQuotes} currentPhilosopher={currentPhilosopher} isFetchingOptions={isFetchingOptions} />}
                </Breadcrumb>
            </Suspense>
        </div>
    )
}

export default MobileHeader
