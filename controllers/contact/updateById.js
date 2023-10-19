const contacts = require("../../models/contacts");
const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);
    res.status(200).json({ message: "Contact updated", updatedContact });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};
module.exports = updateById;
