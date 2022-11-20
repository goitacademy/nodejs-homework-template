const methods = require("../models/contacts");
const { addPostSchema, updatePutSchema } = require("../schemas/schema");

const addPostValidation = async (req, res, next) => {
  const validationResult = addPostSchema.validate(req.body);
  if (validationResult.error) {
    return res
      .status(400)
      .json({ status: "error", message: "missing required name field" });
  }
  next();
};

const putUpdateValidation = async (req, res, next) => {
  const db = await methods.updateContact(req.params.contactId, req.body);

  const validationResult = updatePutSchema.validate(req.body);
  if (validationResult.error || !db) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }

  next();
};

const updateStatusValidation = async (req, res, next) => {};

module.exports = {
  addPostValidation,
  putUpdateValidation,
  updateStatusValidation,
};
