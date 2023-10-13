const contacts = require("../../models/contacts");
const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      next(new Error("Not found"));
    }
    const deletedContact = await contacts.removeContact(contactId);
    res.status(200).json({ message: "Contact deleted", deletedContact });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = deleteById;
