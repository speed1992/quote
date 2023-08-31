import React from 'react'
import buildInfo from '../../../../scripts/buildDate.json'

const BuildInfo = () => {
    return (
        <div style={{ fontSize: '1rem' }}>
            <div>App Version:</div>
            <div>{buildInfo?.buildDateTime}</div>
        </div>
    )
}

export default BuildInfo
