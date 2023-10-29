const { Contact } = require("../models");

const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../decorators");

const updateFavoriteContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

module.exports = {
  updateFavoriteContactController: controllerWrapper(
    updateFavoriteContactController
  ),
};
