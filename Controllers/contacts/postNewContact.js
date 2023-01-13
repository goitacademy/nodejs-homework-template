const { Contact } = require('../../models');

const postNewContact = async (req, res) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  if (!newContact) {
    return res.json({
      status: 'error',
      code: 400,
      message: 'missing required name field',
    });
  }
  return res.status(201).json(newContact);
};

module.exports = postNewContact;
