const messages = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    406: 'Not Acceptable',
    408: 'Request Timeout',
    409: 'Conflict',
    429: 'Too Many Requests',
  }

  const createError = (status, message = messages[status]) => {
    const error = new Error(message)
    error.status = status
    return error
  }
  
  
  module.exports = createError
