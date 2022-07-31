const { basedir } = global;
const { Contact, schemas } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/helpers`);

const updateFavorite = async (req, res) => {
  const { error } = schemas.updateFavourite.validate(req.body);
  if (error) {
    throw createError(400, "missing fields favorite");
  }
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, { favorite });
  if (!result) {
    throw createError(404);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateFavorite;
