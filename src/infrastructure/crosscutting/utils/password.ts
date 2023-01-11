import bcrypt from 'bcrypt'

export async function encryptPassword(password: string) {
    return bcrypt.hash(password, 10)
}