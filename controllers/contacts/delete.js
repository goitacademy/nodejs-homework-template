const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers/RequestError");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "Contact removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
