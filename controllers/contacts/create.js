// POST - add new contact (name, email, phone)
const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");

const create = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = create;
