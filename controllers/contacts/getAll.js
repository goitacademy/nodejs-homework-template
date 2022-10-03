const { Contacts } = require("../../models/contact");

const getAll = async (_, res) => {
  const result = await Contacts.find({});
  res.status(200).json(result);
};

module.exports = getAll;
