import React from 'react'
import styles from '../generate-quote-image/generateQuoteImage.module.css'
import { autoAdjustFont } from '../generate-quote-image/utils/fontutils'

const QuoteWithImage = ({ exportRef, quotationText, philosopherFullName, signature, imageName }) => (
    <div className={`${styles.borderWhite}`} ref={exportRef}>
        <div className={`${styles.fontFredericka} `} style={{ fontSize: autoAdjustFont(quotationText) }}>
            {<img className={styles.phImage} alt={philosopherFullName} src={require('../../../../common/static/assets/images/philosophers/' + imageName)} />}
            <div className={`${styles.alignment} ${styles.quotationColor}`}>
                <p className={`${styles.backgroundTransparent}`}>"{quotationText}"</p>
                <p className={`${styles.backgroundTransparent}`}>{philosopherFullName}</p>
            </div>
            <div className={`${styles.signature}`}>{signature}</div>
        </div>
    </div>
)

export default QuoteWithImage
