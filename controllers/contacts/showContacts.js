import { getContactById } from "../../js/contacts.js";

export async function showContact(res, req, next) {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    contact.length !== 0 && res.status(200).json({ contact });
    contact.length === 0 &&
      res.status(400).json({
        message: "Not found",
      });
  } catch (e) {
    res.status(500).json(`An error occured: ${e}`);
  }
}
