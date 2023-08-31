import copy from 'copy-to-clipboard'
import { useEffect, useRef } from 'react'
import { insert, setCharAt } from '../../../../../common/utils/stringUtils'

export function copyQuoteText(quoteText, philosopherFullName) {
    if (philosopherFullName.toLowerCase().trim() === 'all') {
        let splittingIndex = quoteText.lastIndexOf('― ')
        let updatedQuoteText = setCharAt(quoteText, splittingIndex - 1, '')
        updatedQuoteText = '"' + updatedQuoteText
        updatedQuoteText = insert(updatedQuoteText, splittingIndex, '"\n\n')
        copy(updatedQuoteText)
    } else copy(`"${quoteText}"\n\n${philosopherFullName}`)
}

export function rowClickHandler({ openSnackbar, philosopherFullName, quote, index }) {
    copyQuoteText(quote, philosopherFullName)
    openSnackbar('Copied!', 1000)
}

export function devModeSignature() {
    return isAppInDevMode() ? <>dev-mode</> : null
}

export function isAppInDevMode() {
    return process.env.NODE_ENV !== 'production'
}

export function rowClickHandlerFoBothQuotes({ openSnackbar, quote: { hindi, english }, philosopherNames: { englishFullname, hindiFullname }, index }, event) {
    event.stopPropagation()
    copyBothQuotesText({ hindiQuote: hindi, englishQuote: english }, { englishFullname, hindiFullname })
    openSnackbar('Copied!', 1000)
}

export const copyBothQuotesText = ({ englishQuote, hindiQuote }, { englishFullname, hindiFullname }) => copy(`"${hindiQuote}"\n\n― ${hindiFullname}\n\n\n"${englishQuote}"\n\n― ${englishFullname}`)

export function usePrevious(value) {
    const ref = useRef(null)
    useEffect(() => {
        ref.current = value
    }, [value])
    return ref.current
}

export function copyURL(openSnackbar, callback) {
    callback()
    copy(window.location.href.toString())
    openSnackbar('Quote URL Copied. You can now share!', 1000)
}
