import { FastifyPluginAsync, FastifyPluginCallback } from 'fastify'

export type PluginOptions = Record<string, any>
export type Plugin<T extends PluginOptions = PluginOptions> =
  | FastifyPluginAsync<T>
  | FastifyPluginCallback<T>

export const usePlugin = <T extends PluginOptions = PluginOptions>(
  plugin: Plugin<T>,
) => plugin
