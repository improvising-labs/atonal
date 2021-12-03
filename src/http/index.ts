import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import fastifyCookie, { FastifyCookieOptions } from 'fastify-cookie'
import fastifyCors, { FastifyCorsOptions } from 'fastify-cors'
import addFormats from './validation/add-formats'

declare module 'fastify' {
  interface RequestState {}
  interface FastifyRequest {
    state: RequestState
  }
}

export interface AtonalConfig extends Omit<FastifyServerOptions, 'ajv'> {
  cors?: FastifyCorsOptions | boolean
  cookie?: FastifyCookieOptions | boolean
}

export interface Atonal {
  fast: FastifyInstance
  use: FastifyInstance['register']
  addHook: FastifyInstance['addHook']
  listen: FastifyInstance['listen']
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
      plugins: [addFormats],
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

  const atonal: Atonal = {
    fast,
    use: fast.register.bind(fast),
    addHook: fast.addHook.bind(fast),
    listen: fast.listen.bind(fast),
  }

  return atonal
}
