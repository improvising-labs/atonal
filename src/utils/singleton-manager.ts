export class SingletonManager {
  private static singletons: Record<string, any> = {}

  static put<T>(name: string, instance: T) {
    this.singletons[name] = instance
  }

  static get<T>(name: string) {
    if (!this.singletons[name]) {
      throw new Error(`instance [${name}] is not found`)
    }

    return this.singletons[name] as T
  }
}

export type InstanceRef<T> = { current: T }

export const useSingleton = <T>(name: string, instance?: T): InstanceRef<T> => {
  if (instance) {
    SingletonManager.put(name, instance)
  }

  return {
    set current(newInstance: T) {
      SingletonManager.put(name, newInstance)
    },
    get current() {
      return SingletonManager.get<T>(name)
    },
  }
}
