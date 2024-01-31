import { schema } from "../../helpers/joiValid.js";
import { updateContact } from "../../models/contacts.js";

export async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error.message });
  } else {
    res.json(result);
  }

  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const contacts = await updateContact(contactId, name, email, phone);
    const contact = contacts.find((el) => el.id === parseInt(contactId));

    if (contact) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      res.status(200).json(id);
    } else {
      const contact = {
        id: id,
        name,
        email,
        phone,
      };
      contacts.push(contact);
      return res.status(201).json(id);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
