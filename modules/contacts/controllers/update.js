import {
  update,
  changeFavourite,
} from "../../../services/js/contacts.helpers.js";
import { schema } from "../../../services/js/contacts.validation.js";

export async function updateContact(req, res, next) {
  try {
    const id = req.params.contactId;
    const { name, email, phone } = req.body;
    const val = schema.validate({ name, email, phone });
    if (val.error) {
      return res.status(400).json({
        message: val.error.message,
      });
    }
    const data = await update(id, { name, email, phone });
    return res.status(201).json(data);
  } catch (e) {
    return res.status(500).json(`An error occured: ${e}`);
  }
}

export async function updateStatusContact(req, res, next) {
  try {
    const id = req.params.contactId;
    const { favorite } = req.body;
    if (typeof favorite !== "boolean") {
      return res.status(400).json({
        message: "missing field favourite",
      });
    }
    const data = await changeFavourite(id, favorite);
    return res.status(201).json(data);
  } catch (e) {
    return res.status(404).json(`Not found.`);
  }
}
