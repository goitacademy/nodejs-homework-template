const { listContacts } = require("../../../models/contacts");
const handlerHttpError = require("../utils/handlerHttpError");

const contactControllers = async (req) => {
  const { contactId } = req.params;
  const result = await listContacts.getContactById(contactId);
  if (!result) {
    throw handlerHttpError(404, "Not FOUND !");
  }
  return result;
};

module.exports = contactControllers;
