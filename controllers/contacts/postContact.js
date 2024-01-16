import { nanoid } from "nanoid";

import { contactSchema } from "../../validators/contactSchema.js";
import * as contactsActions from "../../models/contacts/index.js";

export const postContact = async (req, res, next) => {
  const requiredFields = ["name", "email", "phone"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        message: `Missing required ${field} field`,
      });
    }
  }

  const { value, error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const contact = {
    id: nanoid(),
    ...value,
  };

  try {
    const newContact = await contactsActions.addContact(contact);

    res.status(201).json({
      data: newContact,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
