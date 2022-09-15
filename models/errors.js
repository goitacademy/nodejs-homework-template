class BadRequestError extends Error {};
class NotFoundError extends Error {};
class ValidationError extends Error {
    constructor({ message, key }) {
        super(message);

        this.key = key
    }
};

module.exports = {
    BadRequestError,
    NotFoundError,
    ValidationError
}
