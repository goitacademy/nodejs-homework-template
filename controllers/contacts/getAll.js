const Contacts = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const sortFavorite =
    favorite === "false" || favorite.length === 0 ? "false" : "true";
  const skip = (page - 1) * limit;

  const result = await Contacts.find(
    { owner, favorite: sortFavorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit
    }
  ).populate("owner", "_id email subscription");
  res.json(result);
};

module.exports = getAll;
