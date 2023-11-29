import { removeContact } from "#repositories/contactRepository.js";

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    await removeContact(id);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
