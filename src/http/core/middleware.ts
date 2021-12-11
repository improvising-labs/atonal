import { RouteHandler } from 'fastify'
import { RouteSchema, RouteSchemaInterface } from './schema'

export type Middleware<S extends RouteSchema = RouteSchema> = RouteHandler<
  RouteSchemaInterface<S>
>

export const useMiddleware = <S extends RouteSchema = RouteSchema>(
  middleware: Middleware<S>,
) => middleware
