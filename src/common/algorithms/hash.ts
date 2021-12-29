import { createHash, BinaryToTextEncoding } from 'crypto'

export const sha1 = (
  str: string | Buffer,
  encoding: BinaryToTextEncoding = 'hex',
) => createHash('sha1').update(str).digest(encoding)

export const sha256 = (
  str: string | Buffer,
  encoding: BinaryToTextEncoding = 'hex',
) => createHash('sha256').update(str).digest(encoding)

export const md5 = (
  str: string | Buffer,
  encoding: BinaryToTextEncoding = 'hex',
) => createHash('md5').update(str).digest(encoding)

export const hashPassword = (password: string, salt = '') =>
  sha256(password + salt, 'base64')

export const comparePassword = (salt: string, hash: string, password: string) =>
  hashPassword(password + salt) === hash
