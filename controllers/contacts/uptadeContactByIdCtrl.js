const { updateContact } = require("../../services");

const contactValidation = require("../../middlewares/contactsValidation");

const updateContactCtrl = async (req, res) => {
  const { contactId: id } = req.params;
  const { id: owner } = req.user;
  const { error } = contactValidation.validate(req.body);

  const isEmptyBody = Object.keys(req.body).length === 0;
  if (isEmptyBody) {
    return res.status(400).json({
      message: "missing fields",
    });
  }

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedContact = await updateContact(id, owner, req.body);
  if (!updatedContact) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  return res.status(200).json(updatedContact);
};

module.exports = updateContactCtrl;