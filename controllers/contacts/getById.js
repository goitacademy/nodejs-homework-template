const { getError } = require("../../helpers/error");
const { Contact } = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw getError(404);
    }
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

module.exports = getById;
