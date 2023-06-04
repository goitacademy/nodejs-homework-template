const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const postContactRoute = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = ctrlWrapper(postContactRoute);
