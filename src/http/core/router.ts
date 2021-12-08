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
  middlewareTrigger?: MiddlewareTrigger
  middlewares?: Middleware[]
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

export interface RouterRegisterOptions {
  middlewares?: Middleware[]
}

export class Router {
  private readonly prefix: string
  private readonly middlewares: Middleware[]
  private readonly routes: Route[]
  private readonly used: [string, Router][]

  constructor(opts: RouterOptions = {}) {
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
    const { schema, middlewareTrigger, middlewares, handler } = route

    this.routes.push({
      url: resolvePaths(this.prefix, path),
      method,
      schema,
      middlewareTrigger,
      middlewares,
      handler,
    })
  }

  compile() {
    return usePlugin<RouterRegisterOptions>((instance, opts, done) => {
      const { middlewares: extendedMiddlewares = [] } = opts
      const currentMiddlewares = [...extendedMiddlewares, ...this.middlewares]

      for (const route of this.routes) {
        const {
          url,
          method,
          schema,
          middlewareTrigger = 'preValidation',
          middlewares = [],
          handler,
        } = route

        instance.route({
          url,
          method,
          schema,
          [middlewareTrigger]: [...currentMiddlewares, ...middlewares],
          handler,
        })
      }

      for (const [prefix, router] of this.used) {
        instance.register(router.compile(), {
          prefix,
          middlewares: currentMiddlewares,
        })
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
