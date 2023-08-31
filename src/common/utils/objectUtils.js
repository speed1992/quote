import { getPhilosopherObjectIndex } from '../static/utils/utils'

export const merge = (oldOptions, newOptions) => {
    let newOptionsCopy = JSON.parse(JSON.stringify(newOptions))
    newOptionsCopy.forEach((element, newOptionindex) => {
        const oldOptionIndex = getPhilosopherObjectIndex(element.value, oldOptions)
        if (oldOptionIndex !== -1) {
            newOptionsCopy[newOptionindex].quotes = oldOptions[oldOptionIndex].quotes
        }
    })
    return newOptionsCopy
}
