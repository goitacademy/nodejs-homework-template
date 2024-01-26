import { getContactById } from "../../repositories/contacts/getContactsById.js";
import { updateContact } from "../../repositories/contacts/updateContact.js";

export async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const updatedContact = req.body;
  const contact = await getContactById(contactId);
  try {
    const editedContact = await updateContact(contactId, updatedContact);

    if (contact) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: { editedContact },
      });
    } else {
      res.status(404).json({
        status: "Contact not found",
        code: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
}
