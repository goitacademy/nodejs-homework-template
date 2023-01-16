const { addSchema, updateSchema } = require("../schemas/contactsSchemas");

module.exports = {
  addContactValidation: (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json({
          message: "Contact fields are not filled. All fields is required",
        });
    }
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: "error", code: 400, message: error.message });
    }
    next();
  },
  updateContactValidation: (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        message: "Missing fields for update",
      });
    }
    const { error } = updateSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: "error", code: 400, message: error.message });
    }
    next();
  },
};
