const { createUserValidator } = require("../utils/validator");

const checkUserAddData = ({ body }, res, next) => {
  const { error, value } = createUserValidator(body);

  if (error) {
    return next(error);
  }

  const requiredFields = ["name", "email", "phone"];
  for (const field of requiredFields) {
    if (!value[field]) {
      return res.status(400).send(`missing required ${field} field`);
    }
  }

  body = value;

  next();
};

const checkUserPutData = (req, res, next) => {
  const { error, value } = createUserValidator(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  req.body = value;

  next();
};

module.exports = {
  checkUserAddData,
  checkUserPutData,
};
