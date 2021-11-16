class ErrorClass extends Error {
    constructor(message) {
        super(message)
    }
}

class ValidationError extends ErrorClass {
    constructor(message) {
        super(message)
        this.status = 400
    }
}

class WrongParamsError extends ErrorClass {
    constructor(message) {
        super(message)
        this.status = 500
    }
}

class NotAuthorizeError extends ErrorClass {
    constructor(message) {
        super(message)
        this.status = 401
    }
}

module.exports = {
    ErrorClass,
    ValidationError,
    WrongParamsError,
    NotAuthorizeError
}