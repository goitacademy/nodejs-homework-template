const Contact = require("../../models/contact");

const add = async (req, res) => {
  const { body } = req;

  const result = await Contact.create({ favorite: false, ...body });
  res.status(201).json(result);
};

module.exports = add;
