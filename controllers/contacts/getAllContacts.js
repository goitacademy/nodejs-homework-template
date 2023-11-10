import { fetchContacts } from "#repositories/contactRepository.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await fetchContacts();
    return res.json(contacts);
  } catch (err) {
    return next(err);
  }
};
