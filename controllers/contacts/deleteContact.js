const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const deleteContact = async (req, res) => {
  const {_id} = req.user;
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete({
    _id: contactId,
    owner: _id
  }).populate ( "owner","_id subscription email");

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json("Contact deleted");
};

module.exports = deleteContact;