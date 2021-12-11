import { RouteHandler } from 'fastify'
import { RouteGenericInterface } from 'fastify/types/route'

export type Middleware<T extends RouteGenericInterface = any> = RouteHandler<T>

export const useMiddleware = <T extends RouteGenericInterface = any>(
  middleware: Middleware<T>,
) => middleware
