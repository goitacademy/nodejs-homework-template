
const { Contact, schemas } = require('../../models/contact');
const { createError } = require('../../helpers');

const add = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw createError(400);
    }
    const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;