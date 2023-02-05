class HttpError {
  static statusMessages = {
    400: 'Bad Request',
    401: 'Not authorized',
    403: 'Forbidden',
    404: 'Not found',
    409: 'Conflict',
  };

  constructor(status, message = HttpError.statusMessages[status]) {
    const error = new Error(message);
    error.status = status;

    return error;
  }
}

class UserConflictError extends HttpError {
  constructor() {
    return super(409, 'Email in use');
  }
}

class MongoDBActionError extends HttpError {
  constructor(message = 'Unknown error on action wit DB') {
    return super(500, message);
  }
}

class AuthCredentialsError extends HttpError {
  constructor(message = 'Unknown error on action wit DB') {
    return super(401, 'Email or password is wrong');
  }
}

module.exports = {
  AuthCredentialsError,
  HttpError,
  MongoDBActionError,
  UserConflictError,
};
