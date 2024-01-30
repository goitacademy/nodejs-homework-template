import { getContactById } from "../../models/contacts.js";

export async function showContacts(req, res, next) {
  try {
    const contacts = await getContactById();
    const { id } = req.params;

    const contact = contacts.filter((contact) => contact.id === parseInt(id));
    return res.status(200).json({ contact });
  } catch (err) {
    return res.status(404).json(` Not found: ${err}`);
  }
}
