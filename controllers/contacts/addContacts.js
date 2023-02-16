const createError = require("http-errors");
const { modelContact } = require("../../models");
const { contactsSchema } = require("../../schema");

const addContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, `missing required ${error.message}`);
    }
    const result = await modelContact.Contact.create({
      ...req.body,
      owner: _id,
    });
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
module.exports = addContacts;