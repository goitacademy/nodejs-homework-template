const { Contact } = require("../../models/contactsModels");
const asyncHandler = require("express-async-handler");
const { addSchema } = require("../../models/contactsModels")

const add = asyncHandler(async (req, res) => {
  const { error } = addSchema.validate(req.body)
    if (error) {
      res.status(400).json(error.message)
    }
  const result = await Contact.create({ ...req.body });
  res.status(201).json(result);
});

module.exports = add;