export const isUndefined = (value) => typeof value === 'undefined'
export const isObjEmpty = (obj) => Object.values(obj).length === 0 && obj.constructor === Object

export function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))
}
