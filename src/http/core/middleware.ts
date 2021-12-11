import { RouteHandler } from 'fastify'
import { RouteSchema, RouteSchemaInterface } from './schema'

export type Middleware<S extends RouteSchema = never> = RouteHandler<
  RouteSchemaInterface<S>
>

export const useMiddleware = <S extends RouteSchema = never>(
  middleware: Middleware<S>,
) => middleware
