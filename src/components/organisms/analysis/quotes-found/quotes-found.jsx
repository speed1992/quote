import React from 'react'

const QuotesFound = ({ found, markedMode }) => (markedMode ? <>Found: {found} </> : <>Quotes Found: {found} </>)

export default QuotesFound
