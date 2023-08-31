export function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

export function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}