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

export const shuffle = <T>(array: T[]) => {
  let currentIndex = array.length
  let temporaryValue: T
  let randomIndex: number

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
