import { FastifyPluginAsync, FastifyPluginCallback } from 'fastify'

export type Plugin = FastifyPluginAsync | FastifyPluginCallback

export const usePlugin = (plugin: Plugin) => plugin
