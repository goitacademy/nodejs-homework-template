const listContacts = require('../model/listContacts');

const getAllContacts = async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json(data);
};

module.exports = getAllContacts;
