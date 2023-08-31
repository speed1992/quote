import { TextField } from '@mui/material'
import React from 'react'

const DesktopWordLengthSearch = ({start, setStart, end, setEnd}) => {
    return (
        <>
            <TextField className="smallInput" id="outlined-number" label="Start" type="number" size="small" name="start" min="1" value={start} onChange={({ target: { value } }) => setStart(value)} />
            <span className="to">{` to `}</span>
            <TextField className="smallInput" id="outlined-number" label="End" type="number" size="small" name="end" min="0" value={end} onChange={({ target: { value } }) => setEnd(value)} />
        </>
    )
}
export default DesktopWordLengthSearch
