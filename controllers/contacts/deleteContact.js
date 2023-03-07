const Contact = require("../../models/contacts");

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({
    message: "contact deleted",
  });
};


module.exports = deleteContact;