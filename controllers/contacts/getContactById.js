const { createError } = require("../../helpers");
const Contact = require("../../models/contactSchema");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw createError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
