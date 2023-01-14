const { Contact } = require("../../schemas/contact");

async function deleteContact(req, res, next) {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);

  if (contact) {
    const temp = await Contact.findByIdAndDelete(id);
    console.log("deleteContact", temp);

    return res.status(200).json({ message: "contact deleted" });
  }

  return res.status(404).json({ message: "Not found" });
}

module.exports = deleteContact;
