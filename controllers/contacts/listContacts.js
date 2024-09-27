const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const query = { owner };

  if (favorite) {
    query.favorite = favorite === "true";
  }

  const skip = (page - 1) * limit;
  const result = await Contact.find(query, "", { skip, limit });

  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
};
