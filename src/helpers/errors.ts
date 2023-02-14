export class BaseError extends Error {
  protected _status;

  constructor(message: string) {
    super(message);
    this._status = 400;
  }

  public get status() {
    return this._status;
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(message);
    this._status = 400;
  }
}

export class WrongParametersError extends BaseError {
  constructor(message: string) {
    super(message);
    this._status = 400;
  }
}

export class UnAuthorizedError extends BaseError {
  constructor(message: string) {
    super(message);
    this._status = 401;
  }
}
