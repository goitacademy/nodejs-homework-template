const contacts = require("../../models/contacts");
const requestError = require("../../helpers/requestError");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resolve = await contacts.removeContact(contactId);
    if (!resolve) {
      throw requestError(400);
    }
    return res.status(204).json(resolve);
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
