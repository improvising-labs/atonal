import {
  onRequestHookHandler,
  onRequestAsyncHookHandler,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
} from 'fastify'
import { Static } from '../../common/schema'
import { Maybe, Schema } from './router'

export type Middleware<S extends Schema = any> =
  | onRequestHookHandler<
      RawServerDefault,
      RawRequestDefaultExpression<RawServerDefault>,
      RawReplyDefaultExpression<RawServerDefault>,
      {
        Params: Maybe<Static<S['params']>, unknown>
        Querystring: Maybe<Static<S['querystring']>, unknown>
        Body: Maybe<Static<S['body']>, unknown>
        Headers: Maybe<Static<S['headers']>, unknown>
        Reply: Maybe<Static<S['response']>, unknown>
      }
    >
  | onRequestAsyncHookHandler<
      RawServerDefault,
      RawRequestDefaultExpression<RawServerDefault>,
      RawReplyDefaultExpression<RawServerDefault>,
      {
        Params: Maybe<Static<S['params']>, unknown>
        Querystring: Maybe<Static<S['querystring']>, unknown>
        Body: Maybe<Static<S['body']>, unknown>
        Headers: Maybe<Static<S['headers']>, unknown>
        Reply: Maybe<Static<S['response']>, unknown>
      }
    >

export const useMiddleware = <S extends Schema>(middleware: Middleware<S>) =>
  middleware
