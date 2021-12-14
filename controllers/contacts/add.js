const contactsOperation = require('../../model/contacts');
// const { Contact } = require('../../models');
const joiSchema = require('../../models/contact');

const add = async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const result = await contactsOperation.addContact(req.body);
  res.status(201).json({
    status: 201,
    code: 201,
    data: {
      result: result,
    },
  });
};

module.exports = add;
