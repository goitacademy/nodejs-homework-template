const { Contact, schemas } = require("../../models/contact");

const { requestError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      throw requestError(400, "Missing field favorite");
    }

    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedContact) {
      throw requestError(404, "Not found");
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;