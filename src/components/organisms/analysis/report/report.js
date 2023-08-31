import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onFocusHandler as getPhilosopherJSON } from '../../home/desktop/desktop-header/utils/utils'
import { setOptionsRedux, setOriginalOptionsRedux } from '../../home/home-page/homePageRedux/homePageRedux'
import { setThemeClassNameOnHTMLTag } from '../../home/home-page/utils/utils'
import Table from '../table/table'
import columns from './columns.json'
import { createData } from './utils/utils'

const Report = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const markedQuotes = useSelector((state) => state.philosophersData.markedQuotes)
    const options = useSelector((state) => state.philosophersData.options)
    const darkMode = useSelector((state) => state.philosophersData.darkMode)
    const originalOptions = useSelector((state) => state?.philosophersData?.originalOptions)
    const setOriginalOptions = (value) => dispatch(setOriginalOptionsRedux(value))
    const setOptions = (value) => dispatch(setOptionsRedux(value))
    const sorting = useSelector((state) => state.philosophersData.sorting)

    useEffect(() => {
        getPhilosopherJSON({ options, setOptions, originalOptions, setOriginalOptions, sorting })
    }, [])

    useEffect(() => {
        createData({ markedQuotes, options, setData })
    }, [options.length])

    useEffect(() => {
        setThemeClassNameOnHTMLTag(darkMode)
    }, [darkMode])

    return data.length > 0 ? (
        <Table data={data} columns={columns} />
    ) : (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '2rem', margin: '3rem' }}>No records found!</div>
            <div style={{ fontSize: '2rem', margin: '3rem' }}>Please use, marked mode feature, mark quotes as read and come back.</div>
        </>
    )
}

export default Report
