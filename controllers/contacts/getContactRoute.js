const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getContactRoute = async (req, res) => {
  const result = await Contact.find({}, "name email phone favorite");
  res.json(result);
};

module.exports = ctrlWrapper(getContactRoute);
