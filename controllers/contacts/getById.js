const contactsBook = require("../../models/contacts.js");
const errorMessage = require("../../helpers/errorMessage.js");

const getById = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const foundContact = await contactsBook.getContactById(id);
    if (foundContact === null) {
      throw errorMessage(404, "Not found");
    }
    res.status(200).json(foundContact);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
