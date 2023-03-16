// const { removeContact } = require("../../models/contacts");
const { Contact } = require("../../models");

exports.removeContact = async (req, res) => {
  const contactId = req.params.contactId;

  // const contact = await removeContact(contactId);
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) {
    return res.status(404).json({
      msg: "Not Found!",
    });
  }
  res.status("200").json({ message: "contact deleted" });
};
