
const { Contact, schema } = require('../../models/contacts');


const addContact = async (req, res, next) => {
  const { _id } = req.user;

  try {

    const result = await Contact.create({ ...req.body, owner: _id });

    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;

    res.status(201).json({
      status: 'success',
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
