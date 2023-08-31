export function scrollCurrentPhilosopherIntoView(searchText, scollToRef) {
    if (searchText === '' && scollToRef?.current?.childNodes) {
        let parentElement = scollToRef.current
        let currentElement
        for (var i = 0; i < parentElement.childNodes.length; i++) {
            if (parentElement.childNodes[i].id === 'active') {
                currentElement = parentElement.childNodes[i]
                break
            }
        }
        setTimeout(() => {
            currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 500)
    }
}
