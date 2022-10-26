const { logger } = require("../../helpers");
const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  logger.info(owner);
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};
module.exports = { addContact };
