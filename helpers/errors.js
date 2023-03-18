class NotAutorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;

    }
};

class NotEniqueMailError extends Error {
    constructor(message) {
        super(message);
        this.status = 409;

    }
};

module.exports = {
    NotAutorizedError,
    NotEniqueMailError

};