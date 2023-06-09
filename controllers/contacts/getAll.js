const { listContacts } = require("../../models/contacts");
const { wrapper } = require("../../helpers");

const getAll = async (req, res) => {
  const result = await listContacts();

  res.json(result);
};

module.exports = wrapper(getAll);
