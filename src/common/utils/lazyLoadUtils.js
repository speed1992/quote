import { ALPHABETICAL, LATEST } from '../../components/organisms/home/home-page/constants/constants'
import { STATIC_OPTIONS } from '../../components/organisms/home/home-page/homePageRedux/initialState'
import { bringIntoAlphabeticalOrder, bringIntoOriginalOrder } from '../../components/organisms/home/home-page/utils/utils'
import { merge } from './objectUtils'

export const addOptionsDataIntoRedux = ({ newOptions, oldOptions, oldOriginalOptions, setOptions, setOriginalOptions }) => {
    let resultantOptions
    resultantOptions = [...oldOptions, ...newOptions]
    setOptions(resultantOptions)
    setOriginalOptions([...STATIC_OPTIONS, ...newOptions])
}

export const addResponseOptionsDataIntoRedux = ({ newOptions, oldOptions, oldOriginalOptions, setOptions, setOriginalOptions, sorting }) => {
    const originalOptions = [...STATIC_OPTIONS, ...newOptions]
    let resultantOptions = merge(oldOptions, [...originalOptions])
    if (sorting === LATEST) {
        resultantOptions = bringIntoOriginalOrder(originalOptions, resultantOptions)
    } else if (sorting === ALPHABETICAL) {
        resultantOptions = bringIntoAlphabeticalOrder(resultantOptions)
    }
    setOptions([...resultantOptions])
    setOriginalOptions(originalOptions)
}
