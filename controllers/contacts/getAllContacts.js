const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite: reqFavorite = null } = req.query;
  const skip = (page - 1) * limit;
  const favorite = reqFavorite === null ? { $exists: true } : reqFavorite;

  const result = await Contact.find(
    { owner, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");

  res.status(200).json(result);
};

module.exports = getAll;
