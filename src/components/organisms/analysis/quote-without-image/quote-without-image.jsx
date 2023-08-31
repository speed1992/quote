import React from 'react'
import styles from '../generate-quote-image/generateQuoteImage.module.css'
import { autoAdjustFont } from '../generate-quote-image/utils/fontutils'

const QuoteWithoutImage = ({ error, exportRef, quotationText, philosopherFullName, signature }) => (
    <div className={`${styles.borderWhite}`} ref={exportRef}>
        <div className={styles.fontFredericka} style={{ fontSize: autoAdjustFont(quotationText) }}>
            <div className={`${styles.alignmentOld}`}>
                <p className={`${styles.fullWidthOld}`}>"{quotationText}"</p>
                <p>{philosopherFullName}</p>
            </div>
            <div className={`${styles.signature}`}>{signature}</div>
        </div>
    </div>
)

export default QuoteWithoutImage
