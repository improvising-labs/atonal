export class InstanceManager {
  private static instances: Record<string, any> = {}

  static put<T>(name: string, instance: T) {
    this.instances[name] = instance
  }

  static get<T>(name: string) {
    if (!this.instances[name]) {
      throw new Error(`instance [${name}] is not found`)
    }

    return this.instances[name] as T
  }
}

export type InstanceRef<T> = { instance: T }

export const useInstance = <T>(name: string, instance?: T): InstanceRef<T> => {
  if (instance) {
    InstanceManager.put(name, instance)
  }

  return {
    set instance(newInstance: T) {
      InstanceManager.put(name, newInstance)
    },
    get instance() {
      return InstanceManager.get<T>(name)
    },
  }
}

export const getInstance = <T>(name: string) => {
  return InstanceManager.get<T>(name)
}
