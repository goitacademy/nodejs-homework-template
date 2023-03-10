const { Contact } = require("../../models/contact.js");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  let result;

  if (favorite) {
    result = await Contact.find({ owner, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
  } else {
    result = await Contact.find({ owner }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
