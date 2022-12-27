const { getAllContacts } = require('../../service');

const listContactsController = async (req, res, next) => {
  const data = await getAllContacts();
  res.json(data);
};

module.exports = listContactsController;
