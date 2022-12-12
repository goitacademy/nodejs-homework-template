const Contact = require("../../models/contact");

const { httpError } = require("../../helpers");

const { favoriteSchema } = require("../../schemas/contactsSchema");

const updateFavoriteStatusById = async (req, res) => {
  const { error } = favoriteSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404);
  }

  res.json(result);
};

module.exports = updateFavoriteStatusById;
