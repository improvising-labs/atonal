export const ensureValues = <T extends Record<any, any>>(record: T) => {
  const cloned = { ...record }

  for (const key of Object.keys(cloned)) {
    if (cloned[key] === null || cloned[key] === undefined) {
      delete cloned[key]
    }
  }

  return cloned as Required<T>
}

export const makeArray = <T>(value?: T | T[]) => {
  if (value === null || value === undefined) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

const traversalGetHelper = (obj: Record<string, any>, paths: string[]): any => {
  if (obj === undefined || obj === null || paths.length === 0) {
    return obj
  }

  const current = obj[paths.shift()!]

  if (Array.isArray(current)) {
    return current
      .map(item => traversalGetHelper(item, [...paths]))
      .filter(item => item !== undefined && item !== null)
  }

  return traversalGetHelper(current, paths)
}

export const traversalGet = <T>(obj: Record<string, any>, path: string): T => {
  return traversalGetHelper(obj, path.split('.'))
}

export const arrayToMap = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
) => {
  return arr.reduce(
    (mapRef, item) => mapRef.set(String(item[key]), item),
    new Map<string, T>(),
  )
}

const traversalReplaceHelper = (
  data: Record<string, any>,
  sourceMap: Map<string, any>,
  path: string[],
): any => {
  if (path.length === 1) {
    const key = path[0]
    const values = data[key]

    if (values !== undefined && values !== null) {
      if (Array.isArray(values)) {
        data[key] = values.map(item => sourceMap.get(String(item)))
      } else {
        data[key] = sourceMap.get(String(values))
      }
    }
  } else if (path.length > 0) {
    const current = data[path.shift()!]

    if (current !== undefined && current !== null) {
      if (Array.isArray(current)) {
        for (const item of current) {
          traversalReplaceHelper(item, sourceMap, [...path])
        }
      } else {
        traversalReplaceHelper(current, sourceMap, path)
      }
    }
  }
}

export const traversalReplace = <T>(
  data: Record<string, any>,
  sourceMap: Map<string, any>,
  path: string,
): T => traversalReplaceHelper(data, sourceMap, path.split('.'))
