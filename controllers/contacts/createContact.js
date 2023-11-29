import { addContact } from "#repositories/contactRepository.js";

export const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await addContact({ name, email, phone });
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
};
