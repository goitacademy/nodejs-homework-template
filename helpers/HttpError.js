const HttpErrorConstructor = function (status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  
  module.exports = { HttpError: HttpErrorConstructor };
  