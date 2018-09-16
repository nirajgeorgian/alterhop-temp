import crypto from 'crypto'

export const hashPassword = (password, length = 64) => {
  const key = crypto.pbkdf2Sync(password, 'dodoN9@#48^', 100000, length, 'sha512')
  return key.toString('hex')
}

export const hashToken = (size = 50) => {
  const buf = crypto.randomBytes(size)
  return buf.toString('hex')
}
