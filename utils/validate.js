const dataValidator = require("./dataValidator");
const errHttp = require("./errHttp");

const validate = () => {
  const fn = async (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      next(errHttp(400, "Missing fields"));
    }

    const { error } = dataValidator(req.body);

    if (error) {
      const err = error.details[0].path[0];

      next(errHttp(400, `Missing required '${err}' field`));
    }
    next();
  };
  return fn;
};

module.exports = validate;
