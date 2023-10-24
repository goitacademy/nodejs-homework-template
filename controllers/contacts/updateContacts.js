import * as contactsOperations from "../../models/contacts.js";
import contactSchema from "../../validators/contactSchema.js";

export async function updateContacts(req, res, next) {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const { error } = contactSchema.validate({ name, email, phone });
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: "error",
        code: 400,
        message: errorMessage,
      });
    }
    const updatedContact = await contactsOperations.updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (!updatedContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { result: updatedContact },
    });
  } catch (error) {
    next(error);
  }
}
