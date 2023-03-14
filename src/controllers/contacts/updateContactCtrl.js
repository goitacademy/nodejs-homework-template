const { updateContact } = require("../../services");
const { isEmpty } = require("../../helpers");
const contactValidator = require("../../middleware/validator");

const updateContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error } = contactValidator.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  if (isEmpty(body)) return res.status(400).json({ message: "missing fields" });

  const contactToUpdate = await updateContact(contactId, body);

  return contactToUpdate
    ? res.status(200).json(contactToUpdate)
    : res.status(404).json({ message: "Not found" });
};

module.exports = updateContactCtrl;
