const { Contact } = require("../../models");
const { status } = require("../../consts");

const addItem = async (req, res) => {
  const { _id: owner } = req.user;

  const data = await Contact.create({ ...req.body, owner });
  res.status(status.CREATED.status).json({ ...status.CREATED, data });
};

module.exports = addItem;
