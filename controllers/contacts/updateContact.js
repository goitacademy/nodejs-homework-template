const contactsBook = require("../../models/contacts.js");
const errorMessage = require("../../helpers/errorMessage.js");

const updateContact = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(errorMessage(400, "missing fields"));
  }
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
