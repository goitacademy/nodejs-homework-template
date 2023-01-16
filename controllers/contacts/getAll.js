const { listContacts } = require("../../models");
const { getSuccessResponse } = require("../../utils");

const getAll = async (req, res) => {
  const contacts = await listContacts();

  res.json(getSuccessResponse(contacts));
};

module.exports = getAll;
