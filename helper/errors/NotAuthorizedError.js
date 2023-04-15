
class NotAuthorizedError extends Error{
    constructor(message) {
        super(message);
        this.status = 401;
    }
}

module.exports = {
    NotAuthorizedError
}