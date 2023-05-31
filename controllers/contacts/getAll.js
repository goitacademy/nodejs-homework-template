const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const results = await Contact.find({ owner }, "-createdAt -updatedAt", {skip, limit}).populate("owner","name email");
  res.json(results);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
}