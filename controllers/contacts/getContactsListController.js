const { setSuccessResponse } = require("../../helpers");
const { getContactsList } = require("../../models/contacts");

const getContactsListController = async (req, res) => {
  const contactsList = await getContactsList();
  res.json(setSuccessResponse(200, contactsList));
};

module.exports = getContactsListController;
