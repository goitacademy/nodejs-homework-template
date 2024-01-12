const { HttpError } = require("../helpers");

const validateIsBodyEmpty = () => {
     return (req, res, next) => {
         if (Object.keys(req.body).length === 0) {
           throw HttpError(404, "missing fields");
         }
         next()
     }
};

module.exports = validateIsBodyEmpty;
