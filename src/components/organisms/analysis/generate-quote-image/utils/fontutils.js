import { ruleEngine } from '../../../../../common/utils/ruleEngine'
import { rules } from './ruleEngine/rules/rules'

export const autoAdjustFont = (quote) => {
    const words = quote.split(' ').length
    return `${ruleEngine.makeDecision(rules, { value: words, params: null })}rem`
}
