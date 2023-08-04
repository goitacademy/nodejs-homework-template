const { Contact } = require("../../models/index.js");

const add = async (req, res, next) => {
  const { body } = req;
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...body, owner });
  res.status(201).json(result);
};

module.exports = add;
