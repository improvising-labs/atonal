import Ajv from 'ajv'

const extendAjv = (ajv: Ajv.Ajv) => {
  ajv.addFormat('boolean', {
    type: 'string',
    validate: /^(true|false|0|1)$/,
  })

  ajv.addFormat('number', {
    type: 'string',
    validate: /^[+-]?[0-9]+(\.[0-9]+)?$/,
  })

  ajv.addFormat('integer', {
    type: 'string',
    validate: /^[+-]?[0-9]+$/,
  })

  ajv.addFormat('object-id', {
    type: 'string',
    validate: /^[0-9a-fA-F]{24}$/,
  })

  ajv.addFormat('phone-number', {
    type: 'string',
    validate: /^\+[1-9]{1}[0-9]{3,14}$/,
  })
}

export default extendAjv
