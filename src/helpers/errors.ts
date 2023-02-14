export class BaseError extends Error {
  protected _status;
  protected _code;
  protected _data;

  constructor(message: string) {
    super(message);
    this._code = 500;
    this._status = 'fail';
    this._data = 'Internal server error';
  }

  public get status() {
    return this._status;
  }

  public get code() {
    return this._code;
  }

  public get data() {
    return this._data;
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(message);
    this._code = 400;
    this._status = 'error';
    this._data = 'Validation error';
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    this._code = 400;
    this._status = 'error';
    this._data = 'Not found';
  }
}

export class RouteNotFoundError extends BaseError {
  constructor() {
    super(`Use api on routes: 
    /api/users/register - registration user {email, password}
    /api/users/login - login {email, password}
    /api/contacts - get message if user is authenticated`);

    this._code = 404;
    this._status = 'error';
    this._data = 'Not found';
  }
}

export class DatabaseError extends BaseError {
  constructor(message: string) {
    super(message);
    this._code = 409;
    this._status = 'error';
    this._data = 'Conflict';
  }
}

export class UnAuthorizedError extends BaseError {
  constructor(message: string) {
    super(message);
    this._code = 401;
    this._status = 'error';
    this._data = 'Unauthorized';
  }
}

export class ServerError extends BaseError {
  constructor(message: string) {
    super(message);
    this._code = 400;
    this._status = 'fail';
    this._data = 'Internal Server Error';
  }
}
