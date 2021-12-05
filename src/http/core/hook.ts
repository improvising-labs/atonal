import { onRequestAsyncHookHandler, onRequestHookHandler } from 'fastify'

export type Hook = onRequestHookHandler | onRequestAsyncHookHandler

export const useHook = (hook: Hook) => hook
