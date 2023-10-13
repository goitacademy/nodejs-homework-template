const schema = require("../../schemas/schema");
const contacts = require("../../models/contacts");
const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const value = await schema.validateAsync({ name, email, phone });
    const updatedContact = await contacts.updateContact(contactId, value);
    res.status(200).json({ message: "Contact updated", updatedContact });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};
module.exports = updateById;
