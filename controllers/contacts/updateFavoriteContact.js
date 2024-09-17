const {
  contactsModel: { Contact },
} = require("../../models");
const { HttpError } = require("../../helpers");

const updateFavoriteContact = async (req, res) => {
  const isReqBody = Object.keys(req.body).length !== 0;
  if (!isReqBody) {
    throw HttpError(400, "Missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  return res.json(result);
};

module.exports = updateFavoriteContact;
