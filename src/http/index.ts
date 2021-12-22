import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import fastifyCookie, { FastifyCookieOptions } from 'fastify-cookie'
import fastifyCors, { FastifyCorsOptions } from 'fastify-cors'
import { Plugin, PluginOptions, PluginRegisterOptions } from './core/plugin'
import { Router, RouterRegisterOptions } from './core/router'
import extendAjv from './validation/ajv'

declare module 'fastify' {
  interface RequestState {}
  interface FastifyRequest {
    state: RequestState
  }
}

export type CorsOptions = FastifyCorsOptions | boolean
export type CookieOptions = FastifyCookieOptions | boolean

export interface AtonalConfig extends Omit<FastifyServerOptions, 'ajv'> {
  cors?: CorsOptions
  cookie?: CookieOptions
}

export interface AtonalUseFn<T = ReturnType<FastifyInstance['register']>> {
  <Options extends PluginOptions>(
    plugin: Plugin<Options>,
    opts?: PluginRegisterOptions<Options>,
  ): T
  (router: Router, opts?: PluginRegisterOptions<RouterRegisterOptions>): T
}

export interface Atonal {
  fast: FastifyInstance
  listen: FastifyInstance['listen']
  use: AtonalUseFn
  decorateRequest: FastifyInstance['decorateRequest']
  decorateResponse: FastifyInstance['decorateReply']
  addHook: FastifyInstance['addHook']
  addSchema: FastifyInstance['addSchema']
}

export const useAtonal = ({
  cors = false,
  cookie = false,
  ...opts
}: AtonalConfig = {}) => {
  // Create a fastify instance
  const fast = fastify({
    logger: false,
    caseSensitive: true,
    ignoreTrailingSlash: true,
    ajv: {
      plugins: [extendAjv],
    },
    ...opts,
  })

  // Enable cors or not
  if (cors) {
    fast.register(fastifyCors, cors === true ? {} : cors)
  }

  // Enable cookie or not
  if (cookie) {
    fast.register(fastifyCookie, cookie === true ? {} : cookie)
  }

  // Decorate request for state
  fast.decorateRequest('state', null)

  // Implement onRequest hook
  fast.addHook('onRequest', (req, _, next) => {
    // Patch for DELETE method
    if (req.method === 'DELETE' || req.method == 'delete') {
      if (req.headers['content-type']) {
        delete req.headers['content-type']
      }
    }

    // Set initial request state
    req.state = {}

    next()
  })

  const use: AtonalUseFn = (
    obj: Plugin | Router,
    opts?: PluginRegisterOptions<PluginOptions | RouterRegisterOptions>,
  ) => {
    if (obj instanceof Router) {
      return fast.register(obj.compile(), opts)
    } else {
      return fast.register(obj, opts)
    }
  }

  const atonal: Atonal = {
    fast,
    listen: fast.listen.bind(fast),
    use,
    decorateRequest: fast.decorateRequest.bind(fast),
    decorateResponse: fast.decorateReply.bind(fast),
    addHook: fast.addHook.bind(fast),
    addSchema: fast.addSchema.bind(fast),
  }

  return atonal
}
