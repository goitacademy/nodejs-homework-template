const contacts = require("../../models/contacts.js");
const { RequestError } = require("../../utils");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params);
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
