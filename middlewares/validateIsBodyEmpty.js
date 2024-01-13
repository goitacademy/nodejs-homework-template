const { HttpError } = require("../helpers");

const validateIsBodyEmpty = (req, res, next) => {
 
    if (!req.body || Object.keys(req.body).length === 0) {
      throw HttpError(404, "missing fields");
    }
    next();
  
};

module.exports = validateIsBodyEmpty;
