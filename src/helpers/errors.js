class Nodejs55Error extends Error{
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class ValidatoinError extends Nodejs55Error{
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class NotFoundError extends Nodejs55Error{
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

class RegistrationConflictError extends Nodejs55Error{
    constructor(message) {
        super(message);
        this.status = 409;
    }
}

class NotAuthorizedError extends Nodejs55Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}

module.exports = {
    Nodejs55Error,
    ValidatoinError,
    NotFoundError,
    RegistrationConflictError,
    NotAuthorizedError,
}