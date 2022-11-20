const methods = require("../models/contacts");
const { addPostSchema, updatePutSchema } = require("../schemas/schema");

// const addPostValidation = async (req, res, next) => {
//   const validationResult = addPostSchema.validate(req.body);
//   if (validationResult.error) {
//     return res.status(400).json({ status: "error" });
//   }
//   next();
// };

const updateStatusValidation = async (req, res, next) => {};

module.exports = {
  addPostValidation,
  putUpdateValidation,
  updateStatusValidation,
};
