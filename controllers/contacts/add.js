const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { id: owner } = req.user;
    const data = await Contact.create(req.body, owner);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
