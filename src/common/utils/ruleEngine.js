export const ruleEngine = {
    makeDecision: function (rules, { value, params }) {
        for (let i = 0; i <= rules.length; i++) {
            const returnValue = rules[i](value, params)
            if (returnValue) return returnValue
        }
    },
}
