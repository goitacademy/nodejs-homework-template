const { Contact, shemas } = require('../../models/contact');
const { createError } = require('../../helpers');

const add = async (req, res, next) => {
  try {
    const { error } = shemas.add.validate(req.body);
    if (error) {
      throw createError(400);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
