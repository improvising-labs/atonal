export type TypeMapping<S extends Record<string, unknown>> = {
  [key in keyof S]?: (x: NonNullable<S[key]>) => unknown
}

export type TypeTransformed<
  S extends Record<string, unknown>,
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
  S extends Record<string, unknown>,
  T extends TypeMapping<S>,
>(
  source: S,
  mapping: T,
) => {
  const result: Record<string, unknown> = {}

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
