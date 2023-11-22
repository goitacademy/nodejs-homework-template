import { updateContact } from "#repositories/contactRepository.js";

export const putContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateContact({ id, toUpdate: req.body, upsert: true });
    return res.json(result);
  } catch (err) {
    return next(err);
  }
};
