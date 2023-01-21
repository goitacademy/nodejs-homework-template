const { Contact } = require("../../schemas/contact");

async function getContact(req, res, next) {
  const id = req.params.contactId;
  const owrenId = req.user.id;
  const contact = await Contact.findOne({ _id: id, owner: owrenId }).select({
    __v: 0,
    owner: 0,
  });

  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
}

module.exports = getContact;
