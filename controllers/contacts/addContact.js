const { Contact } = require('../../models/index');
const { HttpSuccess } = require('../../helpers');

const addContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(HttpSuccess({ code: 201, data }));
};
module.exports = addContact;
