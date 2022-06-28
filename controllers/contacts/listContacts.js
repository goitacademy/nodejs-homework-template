const { Contact } = require("../../models/contacts");
const { normalizePaginationQuery } = require("../../helpers");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;
  const { normalizedPage, normalizedLimit } = normalizePaginationQuery(
    page,
    limit
  );
  const skip = (normalizedPage - 1) * normalizedLimit;
  const query = { owner: _id };
  if (favorite === "true") {
    query.favorite = true;
  }
  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit: normalizedLimit,
  }).populate("owner", "email");

  res.json(result);
};
module.exports = listContacts;
