const { ctrlWrapper } = require("../../utils");

const { Contact } = require("../../models");

const { HttpError } = require("../../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner, favorite }, "", {
    skip,
    limit,
  }).populate("owner", "name email");
  if (!contacts) {
    throw HttpError(404, `Request failed`);
  }
  res.json(contacts);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
};
