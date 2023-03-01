const { listContacts, updateContactById } = require("../../service/contacts");
const { updateContactSchema } = require("../../schemas/joiValidate");
const updateContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (name || email || phone) {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const contacts = await listContacts();
    if (contacts.every(({ id }) => id !== req.params.contactId)) {
      return res.status(404).json({ message: "Not found" });
    }
    const data = await updateContactById(req.params.contactId, req.body);

    return res.json(data);
  }
  return res.status(400).json({ message: "Missing required name field" });
};
module.exports = updateContact;
