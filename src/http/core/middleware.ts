import {
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteHandler,
} from 'fastify'
import { Static } from '../../common/schema'
import { Maybe, Schema } from './router'

export type Middleware<S extends Schema = any> = RouteHandler<
  {
    Params: Maybe<Static<S['params']>, unknown>
    Querystring: Maybe<Static<S['querystring']>, unknown>
    Body: Maybe<Static<S['body']>, unknown>
    Headers: Maybe<Static<S['headers']>, unknown>
    Reply: Maybe<Static<S['response']>, unknown>
  },
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>
>

export const useMiddleware = <S extends Schema>(middleware: Middleware<S>) =>
  middleware
