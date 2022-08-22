const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updateAt");
  res.json(result);
};

module.exports = getAll;
