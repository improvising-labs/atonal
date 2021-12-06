import {
  FastifySchema,
  HTTPMethods,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler as FastifyRouteHandler,
} from 'fastify'
import { resolvePaths } from '../../common/path'
import { Static } from '../../common/schema'
import { Middleware } from './middleware'
import { usePlugin } from './plugin'

export type Schema = FastifySchema
export type Maybe<T, P> = [T] extends [never] ? P : T
export type MiddlewareTrigger = 'preValidation' | 'preHandler'

export type Handler<S extends Schema = any> = FastifyRouteHandler<
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

export interface Route {
  url: string
  method: HTTPMethods
  schema?: Schema
  middlewares?: Middleware[]
  middlewareTrigger?: MiddlewareTrigger
  handler: Handler<Schema>
}

export interface SchemaRoute<S extends Schema = any> {
  schema?: S
  middlewareTrigger?: MiddlewareTrigger
  middlewares?: Middleware[]
  handler: Handler<S>
}

export interface RouterOptions {
  prefix?: string
  middlewares?: Middleware[]
}

export class Router {
  private readonly prefix: string
  private readonly middlewares: Middleware[]
  private readonly routes: Route[]
  private readonly used: [string, Router][]

  constructor(opts: RouterOptions) {
    this.prefix = opts.prefix ?? '/'
    this.middlewares = opts.middlewares ?? []
    this.routes = []
    this.used = []
  }

  add<S extends Schema>(
    method: HTTPMethods,
    path: string,
    route: SchemaRoute<S>,
  ) {
    const {
      schema,
      middlewares = [],
      middlewareTrigger = 'preValidation',
      handler,
    } = route

    this.routes.push({
      url: resolvePaths(this.prefix, path),
      method,
      schema,
      [middlewareTrigger]: [...this.middlewares, ...middlewares],
      handler,
    })
  }

  compile() {
    return usePlugin((instance, _, done) => {
      for (const route of this.routes) {
        instance.route(route)
      }

      for (const [prefix, router] of this.used) {
        instance.register(router.compile(), { prefix })
      }

      done()
    })
  }

  use(prefix: string, router: Router) {
    this.used.push([prefix, router])
  }

  get<S extends Schema>(path: string, route: SchemaRoute<S>) {
    this.add('GET', path, route)
  }

  post<S extends Schema>(path: string, route: SchemaRoute<S>) {
    this.add('POST', path, route)
  }

  put<S extends Schema>(path: string, route: SchemaRoute<S>) {
    this.add('PUT', path, route)
  }

  patch<S extends Schema>(path: string, route: SchemaRoute<S>) {
    this.add('PATCH', path, route)
  }

  delete<S extends Schema>(path: string, route: SchemaRoute<S>) {
    this.add('DELETE', path, route)
  }

  head<S extends Schema>(path: string, route: SchemaRoute<S>) {
    this.add('HEAD', path, route)
  }

  options<S extends Schema>(path: string, route: SchemaRoute<S>) {
    this.add('OPTIONS', path, route)
  }
}

export const useRouter = (opts: RouterOptions = {}) => new Router(opts)
