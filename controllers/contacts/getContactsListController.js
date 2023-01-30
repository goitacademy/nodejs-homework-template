const { setSuccessResponse } = require("../../helpers");
const operations = require("../../models/contacts");

const getContactsListController = async (req, res) => {
  const contactsList = await operations.getAll();
  res.json(setSuccessResponse(200, contactsList));
};

module.exports = getContactsListController;
