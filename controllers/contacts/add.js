const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Contact.create({ ...req.body, owner });
  res.status(201).json({ code: 201, data });
};

module.exports = ctrlWrapper(add);
