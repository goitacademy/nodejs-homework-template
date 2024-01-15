import { updateContact } from "../../js/contacts.js";
import { schema } from "../../js/validation.js";

export async function updateContact(res, req, next) {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const val = schema.validate(body);
    if (val.error) {
      res.status(400).json({
        message: val.error.message,
      });
      return;
    }
    const data = await updateContact(id, body);
    res.status(201).json({ data });
  } catch (e) {
    res.status(500).json(`An error occured: ${e}`);
  }
}
