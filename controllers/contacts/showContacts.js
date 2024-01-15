import { getContactById } from "../../js/contacts.js";

export async function showContact(req, res, next) {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    contact.length !== 0 && res.status(200).json(contact);
    contact.length === 0 &&
      res.status(400).json({
        message: "Not found",
      });
  } catch (e) {
    res.status(500).json(`An error occured: ${e}`);
  }
}
