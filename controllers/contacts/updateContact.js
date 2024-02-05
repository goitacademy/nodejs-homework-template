import Joi from "joi";

import { updateContacts } from "../../models/contacts.js";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
});

export async function updateContact(req, res, next) {
  try {
    const bodyToCheck = schema.validate(req.body);

    if (bodyToCheck.error) {
      return res.status(400).json({ message: "missing required name - field" });
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const contactToUpdate = await updateContacts(contactId, {
      name,
      email,
      phone,
    });
    if (!contactToUpdate) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json(contactToUpdate);
    }
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
