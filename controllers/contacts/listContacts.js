const { Contact } = require("../../models/contacts");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner: _id };
  if (favorite === "true") {
    query.favorite = true;
  }
  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email");

  res.json(result);
};
module.exports = listContacts;
