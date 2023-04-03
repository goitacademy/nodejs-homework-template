class NotAuthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
};

class AppError extends Error {
  constructor(status, message) {
    const msg = Array.isArray(message) ? message.join(' && ') : message;

    super(msg);
    this.status = status;
  }
}



module.exports = {
    NotAuthorizedError,
    AppError
};