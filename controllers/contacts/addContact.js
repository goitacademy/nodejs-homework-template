const { Contact } = require('../../models/index');
const { HttpSuccess } = require('../../helpers');

const addContacts = async (req, res) => {
  const { _id } = req.user;

  const data = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(HttpSuccess({ code: 201, data }));
};
module.exports = addContacts;
