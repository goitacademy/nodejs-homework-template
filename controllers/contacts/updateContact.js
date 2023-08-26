const contactsBook = require("../../models/contacts.js");
const errorMessage = require("../../helpers/errorMessage.js");

const updateContact = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const updateContactResult = await contactsBook.updateContact(id, req.body);
    if (!updateContactResult) {
      throw errorMessage(404, "Not found");
    }
    res.status(200).json(updateContactResult);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;

// uYYQGME2leJa1W2V;
// alessio;
