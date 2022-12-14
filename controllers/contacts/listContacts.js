const { Contact } = require("../../models/contact");

async function listContacts(req, res) {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite: reqFavorite = null } = req.query;
  const skip = (page - 1) * limit;
  const favorite = reqFavorite === null ? { $exists: true } : reqFavorite;

  const result = await Contact.find(
    { owner: _id, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
}

module.exports = listContacts;
