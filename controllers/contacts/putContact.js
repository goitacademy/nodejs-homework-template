const validation = require("../../models/validation");
const { updateContact } = require("../../models/contacts");

module.exports = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  if (!id || !body) {
    res.status(400).json({ message: "Bad request" });
    return;
  }

  const validationResult = validation(req.body);
  if (validationResult.error) {
    res.status(400).json({ message: validationResult.error.details });
    return;
  }
  const updatedContact = await updateContact(id, body);
  res.status(200).json({ status: "success", data: updatedContact });
};
