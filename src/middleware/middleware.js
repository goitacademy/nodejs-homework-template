const { addSchema, updateSchema } = require("../schemas/schemas");

module.exports = {
  addContValidation: (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        message: "Contact fields are not filled. All fields are required",
      });
    }
    if (req.body.favorite === undefined) {
      req.body.favorite = false;
    }
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: "error", code: 400, message: error.message });
    }
    next();
  },
  updateContValidation: (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        message: "Missing fields for update",
      });
    }
    if (req.body.favorite === undefined) {
      req.body.favorite = false;
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
