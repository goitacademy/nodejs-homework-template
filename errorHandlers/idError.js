class IdError extends Error {
  constructor(id, status, message) {
    super(message);
    this.name = "idError";
    this.status = status || 404;
    this.message = message || `Contact with id: ${id} is not found`;
  }
}

module.exports = IdError;
