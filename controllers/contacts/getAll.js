const { ctrlWrapper } = require("../../helpers");

const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = null } = req.query;

  const skip = (page - 1) * limit;

  if (favorite) {
    const result = await Contact.find({ owner, favorite: true }, "-updatedAt", {
      skip,
      limit,
    });
    res.json(result);
  } else {
    const result = await Contact.find({ owner }, "-updatedAt", {
      skip,
      limit,
    });
    res.json(result);
  }
};

module.exports = { getAll: ctrlWrapper(getAll) };