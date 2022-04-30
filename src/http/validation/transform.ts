export type TypeMapping<S extends Record<string, any>> = {
  [key in keyof S]?: (x: NonNullable<S[key]>) => unknown
}

export type TypeTransformed<
  S extends Record<string, any>,
  T extends TypeMapping<S>,
> = {
  [key in keyof S]: T[key] extends (x: NonNullable<S[key]>) => unknown
    ? S[key] extends undefined
      ? ReturnType<T[key]> | undefined
      : S[key] extends null
      ? ReturnType<T[key]> | null
      : ReturnType<T[key]>
    : S[key]
}

export const transform = <
  S extends Record<string, any>,
  T extends TypeMapping<S>,
>(
  source: S,
  mapping: T,
) => {
  const result: Record<string, any> = {}

  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined) {
      const fn = mapping[key]

      if (fn) {
        result[key] = fn(value as NonNullable<S[string]>)
      } else {
        result[key] = value
      }
    }
  }

  return result as TypeTransformed<S, T>
}

export class StringCast {
  static number(str: string): number
  static number(str?: string): number | undefined
  static number(str?: string) {
    if (str === undefined || str === null) {
      return undefined
    }

    return Number(str)
  }

  static boolean(str: string): boolean
  static boolean(str?: string): boolean | undefined
  static boolean(str?: string) {
    if (str === undefined || str === null) {
      return undefined
    }

    if (str === 'false' || str === 'False' || str === '0') {
      return false
    }

    return true
  }

  static date(str: string): Date
  static date(str?: string): Date | undefined
  static date(str?: string) {
    if (str === undefined || str === null) {
      return undefined
    }

    return new Date(str)
  }
}
