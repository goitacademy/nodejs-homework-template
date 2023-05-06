const { Contact } = require("../../models");

const getAll = async (requirement, response) => {
  const { _id: owner } = requirement.user;
  const { page = 1, limit = 20, favorite } = requirement.query;
  const skip = (page - 1) * limit;

  const filter = favorite ? { owner, favorite } : { owner };

  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  response.json(result);
};

module.exports = getAll;
