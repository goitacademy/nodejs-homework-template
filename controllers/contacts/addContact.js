const contactsOperation = require('../../model/contacts/');
const { contactsSchema } = require('../../schemas/');

const addContact = async (req, res, next) => {
  try {
    const body = req.body; // тело запроса с параметрвми объекта контакт

    const { error } = contactsSchema.validate(body);
    if (error) {
      const err = new Error(error.message);
      err.status = 404;
      throw err;
    }

    const result = await contactsOperation.addContact(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
