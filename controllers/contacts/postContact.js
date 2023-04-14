const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const postContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = {
  postContact: ctrlWrapper(postContact),
};
