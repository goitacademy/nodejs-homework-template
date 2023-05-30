const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const results = await Contact.find({owner}, "-createdAt -updatedAt");
  res.json(results);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
}