function HttpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
  }
  
  function NotFound(req, res) {
    res.status(404).send(`This path ${req.baseUrl} can't found`);
  }
  
  module.exports = {
    HttpError,
    NotFound,
  };