export default {
  padding: {
    default: 0,
    typeOf: 'number'
  },
  algorithm: {
    typeOf: 'string',
    oneOf: ['binary-tree', 'top-down', 'left-right', 'diagonal', 'alt-diagonal'],
    default: 'binary-tree'
  }
}
