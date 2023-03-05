const { updateContact } = require("../../services");

const { isEmpty } = require("../../helpers");
const contactValidation = require("../../middlewares");

const updateContactController = async (req, res) => {
  const { contactId: id } = req.params;
  const { error } = contactValidation.validate(req.body);

  if (isEmpty(req.body)) {
    return res.status(400).json({
      message: "missing fields",
    });
  }

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedContact = await updateContact(id, req.body);
  if (!updatedContact) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  return res.status(200).json(updatedContact);
};

module.exports = updateContactController;
