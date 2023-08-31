import { useEffect, useState } from 'react'

export function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem(key)
    const initial = JSON.parse(saved)
    if (initial === undefined || initial === 'undefined' || initial === 'null' || initial === null) {
        return defaultValue
    } else return initial
}

export function setStorageValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}
