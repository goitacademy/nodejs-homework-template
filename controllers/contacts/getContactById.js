const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const getContactById = async (req, res) => {
  const {_id} = req.user;
  const { contactId } = req.params;

  const result = await Contact.findById({
    _id: contactId,
    owner: _id
  }).populate ( "owner","_id subscription email");

  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

module.exports = getContactById;