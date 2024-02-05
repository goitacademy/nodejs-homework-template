import Joi from "joi";

import { addContact } from "../../models/contacts.js";

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
});

export async function createContact(req, res, next) {
  try {
    const bodyToCheck = schema.validate(req.body);

    if (bodyToCheck.error) {
      return res.status(400).json({ message: "missing required name - field" });
    }
    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone });

    if (!newContact) {
      return res.status(400).json({ message: "Contact already exist" });
    } else {
      res.status(201).json(newContact);
    }
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
