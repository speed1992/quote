export function getQueryParams(qs) {
    qs = qs.split('+').join(' ')

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g
    while ((tokens = re.exec(qs))) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
    }

    return params
}

export function sortFeatureDisabled() {
    var query = getQueryParams(document.location.search)
    let sortValue = query.sort ? query.sort.toLowerCase() : null
    if (sortValue === 'false' || sortValue) return true
    else return false
}
