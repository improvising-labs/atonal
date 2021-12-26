import {
  onRequestAsyncHookHandler,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'
import { RouteSchema, RouteSchemaInterface } from './schema'

export type Middleware<S extends RouteSchema = RouteSchema> =
  onRequestAsyncHookHandler<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    RouteSchemaInterface<S>
  >

export const useMiddleware = <S extends RouteSchema = RouteSchema>(
  middleware: Middleware<S>,
) => middleware
