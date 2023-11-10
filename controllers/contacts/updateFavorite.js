import { updateStatusContact } from "#repositories/contactRepository.js";

export const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const result = await updateStatusContact(id, favorite);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.status(200).json(result);
    }
  } catch (err) {
    return next(err);
  }
};
