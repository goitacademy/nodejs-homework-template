class HttpError {
  constructor(status, message) {
    return { status, message };
  }
}
module.exports = HttpError;
