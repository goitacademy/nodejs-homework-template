const { Contacts } = require("../../models");

const add = async (req, res) => {
  const result = await Contacts.create(req.body);
  res.status(201).json(result);
};

module.exports = add;
