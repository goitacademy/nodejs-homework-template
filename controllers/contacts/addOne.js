const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const addOne = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = ctrlWrapper(addOne);