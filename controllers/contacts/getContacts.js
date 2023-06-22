const { Contact } = require("../../models");
const { wrapper } = require("../../helpers");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = null } = req.query;

  let filter;

  favorite ? (filter = { owner, favorite }) : (filter = { owner });

  const skip = (page - 1) * limit;

  const result = await Contact.find(filter, "-createdAt -updatedAt ", {
    skip,
    limit,
  });

  res.json(result);
};

module.exports = wrapper(getContacts);
