const { Contact } = require("../../schemas/contact");

async function updateStatusContact(req, res, next) {
  const id = req.params.contactId;
  const owrenId = req.user.id;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const contact = await Contact.findOneAndUpdate(
    { _id: id, owner: owrenId },
    body,
    { new: true }
  ).select({ __v: 0, owner: 0 });

  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
}

module.exports = updateStatusContact;
