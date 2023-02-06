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

class WrongParametersError extends CustomError {
    constructor(message) {
        super(message);
        this.status = 400;        
    }
}

class NotAutorizedError extends CustomError {
    constructor(message) {
        super(message);
        this.status = 401;        
    }
}

class ConflictError extends CustomError {
    constructor(message) {
        super(message);
        this.status = 409;        
    }
}

module.exports = {
    CustomError,
    ValidationError, 
    WrongParametersError,
    NotAutorizedError,
    ConflictError
}