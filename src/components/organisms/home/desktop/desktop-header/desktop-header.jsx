import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'react-simple-snackbar'
import ROUTES from '../../../../../common/routes/routes'
import { retryTenTimes } from '../../../../../common/utils/apiUtils'
import Select from '../../../tools/select/select'
import { WordLengthSearch } from '../../../tools/wordLengthSearch/wordLengthSearch'
import LoginRegister from '../../mobile/login-register/login-register'
import styles from './desktop-header.module.css'
import { onFocusHandler, onPhilosopherSelectChange } from './utils/utils'
const Breadcrumb = React.lazy(() => retryTenTimes(() => import('../../../analysis/breadcrumb/breadcrumb')))
const UnreadCounter = React.lazy(() => retryTenTimes(() => import('../../../analysis/unread-counter/unread-counter')))
const QuotesFound = React.lazy(() => retryTenTimes(() => import('../../../analysis/quotes-found/quotes-found')))

function DesktopHeader({ listRef, setSearchText, searchText, start, end, setStart, setEnd, setIsFetching, markedMode, setMarkedMode, currentPhilosopher, setCurrentPhilosopher, options, setOptions, setCurrentData, setQuotesLoaded, isFetchingOptions, setIsFetchingOptions, originalOptions, setOriginalOptions, currentData, isFetching, originalData, markedQuotes, sorting, setRowsRendered, setUserName, userName, isLoggedIn, setIsLoggedIn, setMarkedQuotes, password, setPassword }) {
    const propsToSend = { start, end, setStart, setEnd, setSearchText }
    const [openSnackbar] = useSnackbar()

    return (
        <div className="header">
            <div className="row">
                <div className="column">
                    <WordLengthSearch listRef={listRef} {...propsToSend} />
                </div>
                <div className="column">
                    <TextField className="wordSearch" id="outlined-search" label="Search" type="search" size="small" value={searchText} onChange={({ target: { value } }) => setSearchText(value)} />
                </div>
                <div className="column">
                    <Select isFetchingOptions={isFetchingOptions} options={options} currentPhilosopher={currentPhilosopher} onFocusHandlerCallback={() => onFocusHandler({ options, setOptions, isFetchingOptions, setIsFetchingOptions, originalOptions, setOriginalOptions, sorting })} onChangeHandler={(_, { value: philosopher }) => onPhilosopherSelectChange({ philosopher, listRef, setIsFetching, setStart, setEnd, setSearchText, setCurrentPhilosopher, setCurrentData, options, setOptions, setQuotesLoaded, setRowsRendered })} />
                </div>
                <div className="column">
                    <span>
                        <span className="vertically"></span> Marked Mode
                        <Switch
                            checked={markedMode}
                            onChange={({ target: { checked } }) => {
                                if (checked) {
                                    setMarkedMode(true)
                                } else {
                                    setMarkedMode(false)
                                }
                            }}
                        />
                    </span>
                </div>
                <div className="column">
                    <Link to={ROUTES.report.route} style={{ textDecoration: 'none', color: '#000' }}>
                        <button className={styles.report}>Open Report</button>
                    </Link>
                </div>
                <div className={'column ' + styles.col5}>
                    <LoginRegister {...{ setUserName, userName, openSnackbar, isLoggedIn, setIsLoggedIn, setMarkedQuotes, markedQuotes, password, setPassword, setIsFetching }} />
                    {/* {!isLoggedIn && <div className="backupNote">You can login to backup your marked quotes in database in case browser data gets deleted.</div>} */}
                </div>
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

export default DesktopHeader
