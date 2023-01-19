class Nodejs26Error extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class ValidationError extends Nodejs26Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends Nodejs26Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends Nodejs26Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
const error = (status, message) => {
  const newError = new Error(message);
  newError.status = status;
  return newError;
};
module.exports = {
  NotAuthorizedError,
  WrongParametersError,
  ValidationError,
  Nodejs26Error,
  error,
};
