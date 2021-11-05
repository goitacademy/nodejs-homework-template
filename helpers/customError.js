class CustomError extends Error{
constructor(status, message, name='Custom error') {
  super()
  this.status = status
  this.message = message
  this.name = name
}
}

module.exports={CustomError}