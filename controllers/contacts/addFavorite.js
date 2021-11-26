const Contact = require("../../model/contacts");
const createError = require("http-errors");
const joiFavSchema = require("../../middlewares/joiFavoriteSchema");

const addFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const { error } = joiFavSchema.validate(req.body);
  if (error) {
    throw createError(400, "missing field favorite");
  }
  const fav = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!fav) {
    throw createError(404, "Not found");
  }
  res.json({
    status: "succsess",
    code: 200,
    message: "contact updated",
    result: fav,
  });
};

module.exports = addFavorite;
