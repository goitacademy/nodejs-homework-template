import { contactUpdateSchema } from "../schemas/contacts-schemas.js";

export const isValidateBodyPut = (req, res, next) => {
  const { error } = contactUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};
