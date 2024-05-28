class customErrorHandler extends Error {
  constructor (message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}
const createCustomError = (message, statusCode) => {
  return new customErrorHandler(message, statusCode)
}

module.exports = { createCustomError, customErrorHandler }
