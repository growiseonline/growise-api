import { randomUUID } from 'crypto'


export function generateUUID() {
    return randomUUID({})
}

export interface IGenerateRandomStringProps {
    useSpecialCharacters: boolean
    useLowerCase: boolean
    useUpperCase: boolean
    useNumbers: boolean
    size: number
}

export function generateRandomString({ useLowerCase, useNumbers, size, useSpecialCharacters, useUpperCase }: IGenerateRandomStringProps) {
    let pattern = ''
    const specialCharacters = '+=_-)(*&¨%$#@!`{^}[]´~;:*,'
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'

    if (useLowerCase) {
        pattern += lowerCase
    }

    if (useNumbers) {
        pattern += numbers
    }

    if (useSpecialCharacters) {
        pattern += specialCharacters
    }

    if (useUpperCase) {
        pattern += upperCase
    }

    let result = ''

    for (let i = 1; i <= size; i++) {
        const n = Math.round(Math.random() * pattern.length)

        result += pattern[n]
    }

    return result
}