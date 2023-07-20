const { Contact } = require("../../models/contact");
const { ctrlWrapper, paginationParams } = require("../../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const findFilter = { owner };

  if (favorite === "true" || favorite === "false")
    findFilter.favorite = favorite;

  const result = await Contact.find(
    findFilter,
    {},
    {
      ...paginationParams(page, limit),
    }
  ).populate("owner", "email subscribtion");
  res.json(result);
};

module.exports = ctrlWrapper(getAll);
