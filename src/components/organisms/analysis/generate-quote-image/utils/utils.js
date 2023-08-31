import html2canvas from 'html2canvas'

const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement('a')
    fakeLink.style = 'display:none;'
    fakeLink.download = fileName

    fakeLink.href = blob

    document.body.appendChild(fakeLink)
    fakeLink.click()
    document.body.removeChild(fakeLink)

    fakeLink.remove()
}

export const exportAsImage = async (element, imageFileName) => {
    const html = document.getElementsByTagName('html')[0]
    const body = document.getElementsByTagName('body')[0]
    let htmlWidth = html.clientWidth
    let bodyWidth = body.clientWidth
    const newWidth = element.scrollWidth - element.clientWidth
    if (newWidth > element.clientWidth) {
        htmlWidth += newWidth
        bodyWidth += newWidth
    }
    html.style.width = htmlWidth + 'px'
    body.style.width = bodyWidth + 'px'
    const canvas = await html2canvas(element, { scale: 3 })
    const image = canvas.toDataURL('image/png', 1.0)
    downloadImage(image, imageFileName)
    html.style.width = null
    body.style.width = null
}

export const shareQuote = async (element, imageFileName) => {
    ;(async () => {
        if (!('share' in navigator)) {
            return
        }
        const canvas = await html2canvas(element, { scale: 3 })
        canvas.toBlob(async (blob) => {
            const files = [new File([blob], imageFileName, { type: blob.type })]
            const shareData = {
                files,
            }
            if (navigator.canShare(shareData)) {
                try {
                    await navigator.share(shareData)
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error(err.name, err.message)
                    }
                }
            } else {
                console.warn('Sharing not supported', shareData)
            }
        })
    })()
}
