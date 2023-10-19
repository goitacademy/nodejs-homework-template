const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };
  if (favorite) {
    filter.favorite = favorite === "true";
  }
  const data = await Contact.find(filter)
    .skip(skip)
    .limit(limit)
    .populate("owner", "name email");
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data });
};

module.exports = ctrlWrapper(getAll);
