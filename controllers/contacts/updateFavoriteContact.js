const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const updateFavoriteContact = async (req, res) => {
  const {_id} = req.user;
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate({
    _id: contactId,
    owner: _id
  }, req.body, {
    new: true,
  }).populate ( "owner","_id subscription email");

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

module.exports = updateFavoriteContact;