const { Conflict } = require("http-errors");

const { Contact } = require("../../models");

const add = async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;

  const user = await Contact.findOne({ name });
  if (user) {
    throw new Conflict("The name is already in use");
  }
  const newContact = await Contact.create({ ...req.body, owner: _id });
  res
    .status(201)
    .json({ message: "contact successfully added", result: newContact });
};

module.exports = add;
