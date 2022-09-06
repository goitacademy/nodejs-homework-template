class NodeErrorCustoms extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidateError extends NodeErrorCustoms {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParamsError extends NodeErrorCustoms {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizeError extends NodeErrorCustoms {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ValidateError,
  WrongParamsError,
  NotAuthorizeError,
  NodeErrorCustoms,
};
