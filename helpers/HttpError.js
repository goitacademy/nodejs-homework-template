const { httpErrorMessageList } = require('../variables');

class HttpError extends Error {
  constructor(status, message = httpErrorMessageList[status]) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

module.exports = HttpError;
