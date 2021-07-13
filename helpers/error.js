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
    }
}

class RegistrationConflictError extends CustomError {
    constructor(message) {
        super(message);
        this.status = 409;
    }
}

class WrongParametersError extends CustomError {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class NotAuthorizedError extends CustomError {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
class NoSuchUserError extends CustomError {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

export {
    CustomError,
    ValidationError,
    RegistrationConflictError,
    WrongParametersError,
    NotAuthorizedError,
    NoSuchUserError,
};
