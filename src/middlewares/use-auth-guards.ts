import { Middleware, useMiddleware } from '../http/core/middleware'

export type AuthGuardsStrategy = 'all-pass' | 'one-pass' | 'ignore-error'

export interface AuthGuardsOptions {
  strategy?: AuthGuardsStrategy
  guards: Middleware[]
}

export const useAuthGuards = ({
  strategy = 'one-pass',
  guards,
}: AuthGuardsOptions) => {
  return useMiddleware(async function (req, res) {
    let authed = false
    let firstError: Error | undefined

    for (const guard of guards) {
      try {
        await guard.call(this, req, res)

        authed = true

        if (strategy === 'one-pass') {
          break
        }
      } catch (error) {
        if (strategy === 'all-pass') {
          throw error
        }

        firstError ??= error as Error
      }
    }

    if (!authed && strategy !== 'ignore-error') {
      throw firstError
    }

    req.state.authed = authed
  })
}
