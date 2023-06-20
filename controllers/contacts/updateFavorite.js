const Contact = require("../../models/contact");

const { HttpError, ctrlWrappers } = require("../../helpers");

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById({_id: contactId });
    if (!result) {
      throw HttpError(404, "Not found");
    }
  res.json(result)
}

module.exports = {    updateFavorite: ctrlWrappers(updateFavorite)}