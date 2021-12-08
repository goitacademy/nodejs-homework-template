const { Contact } = require('../../models');

const getAll = async (_, res) => {
  const contacts = await Contact.find({});
  if (!contacts) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.json(contacts);
};

module.exports = getAll;
