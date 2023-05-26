const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getAll = async (req, res, next) => {
  const results = await Contact.find();
  res.json(results);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
}