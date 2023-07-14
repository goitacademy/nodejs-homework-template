const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const addContactById = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = ctrlWrapper(addContactById);
