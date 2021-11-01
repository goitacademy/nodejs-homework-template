class CustomError extends Error {
  constructor(status, message, name = "CustomError") {
    super();
    this.status = status;
    this.message = message;
    this.name = name;
  }
}

module.exports = { CustomError };
