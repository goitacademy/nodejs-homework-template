import { removeContact } from "../../repositories/contacts/removeContact.js";
import { getContactById } from "../../repositories/contacts/getContactsById.js";

export async function deleteContacts(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  try {
    if (contact) {
      await removeContact(contactId);

      res.status(200).json({
        status: "success",
        code: 200,
        message: "Contact deleted",
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
