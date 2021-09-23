const contactsOperations = require("../../model/contacts");
const { sendSuccessResponse } = require("../../utils");

const getAll = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  sendSuccessResponse(res, { contacts });
};
module.exports = getAll;
