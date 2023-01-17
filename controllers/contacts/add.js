const { Contacts } = require("../../models");

const add = async (req, res) => {
  const { _id } = req.user;
  const result = await Contacts.create({ ...req.body, owner: _id });
  res.status(201).json(result);
};

module.exports = add;
