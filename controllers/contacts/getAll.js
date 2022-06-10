const { Contact } = require("../../models");

const getAll = async (_, res) => {
  const contact = await Contact.find();
  res.json({ contact });
};

module.exports = getAll;
