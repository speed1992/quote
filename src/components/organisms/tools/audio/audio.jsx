import React from 'react'
import { useSelector } from 'react-redux'
import { play } from './utils/speechUtils'

const Audio = ({ index, currentData, scrollPosition, setScrollPosition, listRef }) => {
    const voiceSpeed = useSelector(({ philosophersData: { voiceSpeed } }) => voiceSpeed)

    return <button onClick={play.bind(this, index, currentData, voiceSpeed, listRef, scrollPosition, setScrollPosition)}>Play Audio</button>
}

export default Audio
