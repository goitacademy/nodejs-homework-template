const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!req.body) {
      res.status(400).json({ message: "missing field favorite" });
    }

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
