import { RouteHandler } from 'fastify'
import { RouteGenericInterface } from 'fastify/types/route'

export type Middleware<
  T extends RouteGenericInterface = RouteGenericInterface,
> = RouteHandler<T>

export const useMiddleware = <
  T extends RouteGenericInterface = RouteGenericInterface,
>(
  middleware: Middleware<T>,
) => middleware
