import { Contacts } from "#models/contacts.shema.js";

export { createContacts };

async function createContacts(req, res, next) {
  const contact = new Contacts({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  contact.save();

  return res.json({ data: contact });
}
