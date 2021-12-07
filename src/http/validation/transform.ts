export type TypeMapping<S extends Record<string, unknown>> = {
  [key in keyof S]?: (x: S[key]) => unknown
}

export type TypeTransformed<
  S extends Record<string, unknown>,
  T extends TypeMapping<S>,
> = {
  [key in keyof S]: T[key] extends (...args: any) => any
    ? S[key] extends undefined
      ? ReturnType<T[key]> | undefined
      : ReturnType<T[key]>
    : S[key]
}

export const transform = <
  S extends Record<string, unknown>,
  T extends TypeMapping<S>,
>(
  source: S,
  mapping: T,
) => {
  const result: any = {}

  for (const [key, fn] of Object.entries(mapping)) {
    if (source[key]) {
      if (typeof fn === 'function') {
        result[key] = fn(source[key])
      } else {
        result[key] = source[key]
      }
    }
  }

  return result as TypeTransformed<S, T>
}
