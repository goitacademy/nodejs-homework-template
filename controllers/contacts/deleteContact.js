const contactsBook = require("../../models/contacts.js");
const errorMessage = require("../../helpers/errorMessage.js");

const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const deleteContact = await contactsBook.removeContact(id);
    if (deleteContact === null) {
      throw errorMessage(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
