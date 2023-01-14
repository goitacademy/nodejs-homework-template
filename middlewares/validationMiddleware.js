const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../validation/validationJoiSchemas");

module.exports = {
  addContactValidation: (req, res, next) => {
    const { error } = addContactSchema.validate(req.body);

    if (error) res.status(400).json({ message: error?.details[0].message });

    next();
  },
  updateContactValidation: (req, res, next) => {
    const { error } = updateContactSchema.validate(req.body);

    if (error) res.status(400).json({ message: error?.details[0].message });

    next();
  },

  updateStatusValidation: (req, res, next) => {
    const { error } = updateStatusSchema.validate(req.body);

    if (error) res.status(400).json({ message: "Missing field favorite" });

    next();
  },
};
