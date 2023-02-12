const { BadRequest } = require('http-errors');
const { addContact } = require('../../models/contacts');
const { contactsSchema } = require('../../schemas');

const add = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) throw new BadRequest(error.message);

    const contact = await addContact(req.body);
    res.status(201).json({
      success: true,
      code: 201,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
