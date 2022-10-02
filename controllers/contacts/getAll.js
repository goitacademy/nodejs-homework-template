const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    const favoriteData = await Contact.find({ owner: _id, favorite: true });

    res.json({
      favoriteData,
    });
  }

  const data = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: data,
      page,
      limit,
    },
  });
};

module.exports = getAll;
