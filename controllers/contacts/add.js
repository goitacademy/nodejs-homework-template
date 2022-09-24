const { Contact, schema } = require('../../models/contacts');
const createError = require('../../errors');
// const schema = require('../../schema/schema-joi');

const add = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, 'missing required name field');
    }

    const result = await Contact.create(req.body);
    res.status(201).json({ status: 'success', code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
