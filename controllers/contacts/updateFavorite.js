const {HttpError} = require("../../helpers");

const { Contact } = require("../../models");


const updateFavorite = async (req, res, next) => {
  const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if(!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
}

module.exports = updateFavorite;