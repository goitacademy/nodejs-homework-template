const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const addOne = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

module.exports = ctrlWrapper(addOne);