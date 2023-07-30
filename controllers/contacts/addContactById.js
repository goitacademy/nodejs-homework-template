const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const addContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  console.log(result);
  res.status(201).json(result);
};

module.exports = ctrlWrapper(addContactById);
