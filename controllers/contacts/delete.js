const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await Contact.findByIdAndRemove(contactId);
    if (!data) {
      throw createError(404);
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
