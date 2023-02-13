const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const search = () => {
    if (favorite) {
      return { owner: _id, favorite: JSON.parse(favorite) };
    } else {
      return { owner: _id };
    }
  };

  const contacts = await Contact.find(search(), "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id, email");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
