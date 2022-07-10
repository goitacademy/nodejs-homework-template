const createError = require("../../helpers/error");
const { Contact } = require("../../models/contacts");

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    if (!deletedContact) {
      throw createError(404);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteById;
