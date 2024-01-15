import { addContact } from "../../js/contacts.js";
import { schemaReq } from "../../js/validation.js";

export async function createContact(req, res, next) {
  try {
    const body = req.body;
    const val = schemaReq.validate(body);
    if (val.error) {
      res.status(400).json({
        message: val.error.message,
      });
      return;
    }
    const data = await addContact(body);
    res.status(201).json({ data });
  } catch (e) {
    res.status(500).json(`An error occured: ${e}`);
  }
}
