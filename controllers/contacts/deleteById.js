const { Contact } = require("../../models/contact");
const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const deleteContact = await Contact.findByIdAndRemove({ _id: id });
  if (!deleteContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({
    message: `Contact deleted`,
  });
};

module.exports = deleteById;
