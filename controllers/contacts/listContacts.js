const { Contact } = require('../../models');
const { ctrlWrapper } = require('../../utils');

const listContacts = async (_, res) => {
  const result = await Contact.find();

  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
};
