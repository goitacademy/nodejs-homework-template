const { Contact } = require("../models");
const { ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = favorite !== undefined ? { owner, favorite } : { owner };
  const result = await Contact.find(query, null, { skip, limit }).populate(
    "owner",
    "email"
  );
  res.json(result);
};

module.exports = ctrlWrapper(listContacts);
