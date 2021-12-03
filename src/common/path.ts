export const resolvePaths = (...paths: string[]) => {
  const result: string[] = []

  while (paths.length > 0) {
    const path = paths
      .shift()!
      .replace(/^[\/]+/, '')
      .replace(/[\/]+$/, '')

    if (path.length > 0) {
      result.push(path)
    }
  }

  return '/' + result.join('/')
}
