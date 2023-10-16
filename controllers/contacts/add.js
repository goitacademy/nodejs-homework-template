const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const add = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json({ code: 201, data });
};

module.exports = ctrlWrapper(add);
