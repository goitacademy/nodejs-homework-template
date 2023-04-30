const { ctrlWrapper } = require("../../utils");

const { Contact } = require("../../models");

const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findById(id).populate("owner", "name email");

  if (!result || result.owner._id.toString() !== owner.toString()) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

module.exports = { getContactById: ctrlWrapper(getContactById) };
