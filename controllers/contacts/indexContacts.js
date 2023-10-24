import * as contactsOperations from "../../models/contacts.js";

export async function indexContacts(req, res, next) {
  try {
    const contacts = await contactsOperations.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
}
