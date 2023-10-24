import * as contactsOperations from "../../models/contacts.js";
import contactSchema from "../../validators/contactSchema.js";

export async function createContacts(req, res, next) {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ message: errorMessage });
    }
    const { name, email, phone } = req.body;
    const newContact = await contactsOperations.addContact({
      name,
      email,
      phone,
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: { result: newContact },
    });
  } catch (error) {
    next(error);
  }
}
