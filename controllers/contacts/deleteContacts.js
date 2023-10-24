import * as contactsOperations from "../../models/contacts.js";

export async function deleteContacts(req, res, next) {
  try {
    const { contactId } = req.params;
    const removeConact = await contactsOperations.removeContact(contactId);
    if (!removeConact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
}
