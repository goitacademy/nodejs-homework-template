const {
  listContacts,
  updateStatusContactById,
} = require("../../service/contacts");

const { updateStatusSchema } = require("../../schemas/joiValidate");
const updateStatusContact = async (req, res) => {
  const { error } = updateStatusSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const contacts = await listContacts();
  if (contacts.every(({ id }) => id !== req.params.contactId)) {
    return res.status(404).json({ message: "Not found" });
  }
  const data = await updateStatusContactById(req.params.contactId, req.body);
  return res.json(data);
};
module.exports = updateStatusContact;
