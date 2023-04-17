const {Contact} = require("../../models");
const {ctrlWrapper, HttpError} = require("../../helpers");

const { updateFavoriteSchema} = require("../../models");

const updateFavorite = async (req, res, next) => {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
  
    const id = req.params.contactId;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(result);
  };
  
  module.exports = {
    updateFavorite: ctrlWrapper(updateFavorite),
  };
  