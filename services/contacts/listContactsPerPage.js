const Contact = require("../../models/contacts");
const listContactsPerPage = async (_id, skip, limit) => {
  const result = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email");

  return result;
};

module.exports = listContactsPerPage;
