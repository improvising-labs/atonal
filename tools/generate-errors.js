const fs = require('fs')
const path = require('path')
const errors = require('./errors.json')
const errorSnippets = []

for (const [code, message] of Object.entries(errors)) {
  const className = message.replace(/\s/g, '')

  errorSnippets.push(
    `export class ${className} extends HttpError { constructor(message?: string) { super(${code}, message) } }`,
  )
}

fs.writeFileSync(
  path.resolve(__dirname, '../src/utils/http-errors.ts'),
  errorSnippets.join('\n\n'),
  'utf-8',
)
