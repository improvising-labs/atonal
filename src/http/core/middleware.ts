import { RouteHandler } from 'fastify'
import { RouteSchema, RouteSchemaInterface } from './schema'

export type Middleware<S extends RouteSchema = undefined> = RouteHandler<
  RouteSchemaInterface<S>
>

export const useMiddleware = <S extends RouteSchema = undefined>(
  middleware: Middleware<S>,
) => middleware
