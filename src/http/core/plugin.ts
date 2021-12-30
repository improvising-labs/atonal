import {
  FastifyPluginAsync,
  FastifyPluginCallback,
  FastifyRegisterOptions,
} from 'fastify'

export interface PluginMeta {
  description?: string
  global?: boolean
}

export type PluginRegisterOptions<Options> = FastifyRegisterOptions<Options>
export type PluginOptions = Record<string, any>
export type Plugin<T extends PluginOptions = PluginOptions> =
  | FastifyPluginAsync<T>
  | FastifyPluginCallback<T>

export const usePlugin = <T extends PluginOptions = PluginOptions>(
  plugin: Plugin<T>,
  meta: PluginMeta = {},
) => {
  if (meta.description) {
    Object.assign(plugin, { name: meta.description })
  }

  if (meta.global) {
    Object.assign(plugin, {
      [Symbol.for('skip-override')]: true,
    })
  }

  return plugin
}
