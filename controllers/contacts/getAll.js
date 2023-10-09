const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const queryForFind = { owner };

  if (req.query?.favorite) {
    queryForFind.favorite = req.query.favorite;
  }

  const result = await Contact.find(queryForFind, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

  res.json({
    status: "success",
    code: 200,
    data: { contacts: result },
  });
};

module.exports = { getAll: ctrlWrapper(getAll) };
