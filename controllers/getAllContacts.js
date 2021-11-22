const { Contact } = require('../model/contact');

const getAllContacts = async (_, res) => {
  const result = await Contact.find({});

  if (!result) {
    res.status(404).send({ message: 'Not found' });
  }

  res.json({ status: 'success', code: 200, data: { result } });
};

module.exports = getAllContacts;
