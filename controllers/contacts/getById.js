const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const id = req.params.contactId;

  const oneContact = await Contact.findById(id);
  if (!oneContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(oneContact);
};
module.exports = getById;
