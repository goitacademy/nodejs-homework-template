const { Contact } = require("../../models/contact");

const { ctrlWrapper } = require("../../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    const result = await Contact.find(
      { owner, favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "name email");
    return res.json(result);
  }

  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
