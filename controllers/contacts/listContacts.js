const Contact = require("../../models/contact.js");
const { ctrlWrapper } = require('../../helpers');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;

  const filter = favorite === null ? { owner } : { favorite, owner };

  const result = await Contact.find(filter, "", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(result);
};

module.exports = {listContacts: ctrlWrapper(listContacts)};