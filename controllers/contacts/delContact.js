const { Contact } = require("../../models/contacts");
const { createError } = require("../../helpers");
const delContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};
module.exports = delContact;
