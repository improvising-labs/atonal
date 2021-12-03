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

export const hashPassword = (str: string, salt = '') =>
  sha256(str + salt, 'base64')
