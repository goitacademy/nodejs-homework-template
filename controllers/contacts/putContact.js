import { contactSchema } from "../../validators/contactSchema.js";
import * as contactsActions from "../../models/contacts/index.js";

export const putContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: "missing fields",
      });
      return;
    }

    const { value, error } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const updatedContact = await contactsActions.updateContact(
      contactId,
      value
    );

    res.status(200).json({
      data: updatedContact,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
