const { HttpError } = require("../helpers");

const handleBodyChange = (req, res, next) => {
    const body = req.body;
    
  if (Object.keys(body).length === 0) {
    throw HttpError(400, "The fields was missed");
  }
  next();
};

module.exports = handleBodyChange;
