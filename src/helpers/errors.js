class CustomError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 400;
    this.message = {
      Status: "400 Bad Request",
      "Content-Type": "application/json",
      ResponseBody: message,
    };
  }
}

class WrongParametersError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 400;
    this.message = {
      Status: "400 Bad Request",
      "Content-Type": "application/json",
      ResponseBody: message,
    };
  }
}

class WrongParametersForContactByIdError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 404;
    this.message = {
      Status: "400 Bad Request",
      "Content-Type": "application/json",
      ResponseBody: message,
    };
  }
}

class NotAuthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 401;
    this.message = {
      Status: "401 Unauthorized",
      ResponseBody: {
        message,
      },
    };
  }
}

class ConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 409;
    this.message = {
      Status: "409 Conflict",
      "Content-Type": "application/json",
      ResponseBody: {
        message: "Email in use",
      },
    };
  }
}

module.exports = {
  CustomError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  WrongParametersForContactByIdError,
  ConflictError,
};
