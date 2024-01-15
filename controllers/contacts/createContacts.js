import { addContact } from "../../js/contacts";
import { schemaReq } from "../../js/validation";

export async function createContact(res, req, next) {
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
