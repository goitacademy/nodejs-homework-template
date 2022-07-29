const createError = require("../../helpers");
const { Contact, schemas } = require("../../models");

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { error } = schemas.contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addContact;
