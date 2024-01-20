import { getOne } from "../../../services/js/contacts.helpers.js";

export async function getOneContact(req, res, next) {
  try {
    const id = req.params.contactId;
    const contact = await getOne(id);
    return res.status(200).json(contact);
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
