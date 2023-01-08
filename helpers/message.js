function HttpError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
  }
  
  function NotFound(req, res) {
    res.status(404).send(`Can't found this page`);
  }
  
  module.exports = {
    HttpError,
    NotFound,
  };