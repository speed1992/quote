import React from 'react'
import styles from './breadcrumb.module.css'

function Breadcrumb({ children }) {
    return <span className={styles.alignment}>{children}</span>
}

export default Breadcrumb
