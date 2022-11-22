
class NodeHwError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}


class ValidationError extends NodeHwError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
};
class NotFoundError extends NodeHwError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
};

class WrongParametersError extends NodeHwError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
};

class NotAutorizedError extends NodeHwError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class InUseError extends NodeHwError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}


module.exports = {
  NodeHwError,
  ValidationError,
  InUseError,
  WrongParametersError,
  NotAutorizedError,
  NotFoundError,
};