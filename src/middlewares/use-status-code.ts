import { useMiddleware } from '../http/core/middleware'

export const useStatusCode = (statusCode: number) => {
  return useMiddleware(async (_, res) => {
    res.code(statusCode)
  })
}
