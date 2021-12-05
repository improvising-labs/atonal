import { RouteHandler } from 'fastify'

export type Middleware = RouteHandler

export const useMiddleware = (middleware: Middleware) => middleware
