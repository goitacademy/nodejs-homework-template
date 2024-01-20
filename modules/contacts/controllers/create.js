import { create } from "../../../services/js/contacts.helpers.js";
import { schemaReq } from "../../../services/js/contacts.validation.js";

export async function createContact(req, res, next) {
  try {
    const body = req.body;
    const val = schemaReq.validate(body);
    if (val.error) {
      return res.status(400).json({
        message: val.error.message,
      });
    }
    const data = await create(body);
    return res.status(201).json({ data });
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
