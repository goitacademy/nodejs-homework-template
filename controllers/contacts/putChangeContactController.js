const { updateContact } = require("../../service/contacts");

const putChangeContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);
  if (data) {
    res.status(201).json({ message: data });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};
module.exports = putChangeContactController;
