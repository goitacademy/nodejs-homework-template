import { fetchContact } from "#repositories/contactRepository.js";

export const getContact = async (req, res, next) => {
  try {
    const contact = await fetchContact(req.params.id);
    if (contact) {
      return res.json(contact);
    } else {
      return next();
    }
  } catch (err) {
    return next(err);
  }
};
