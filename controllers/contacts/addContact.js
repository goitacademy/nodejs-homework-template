const { Contact } = require("../../models");
const { addSchema } = require("../../schemas/contact");
const { createError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw createError(404, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addContact;
