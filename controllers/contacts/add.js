const { Contact } = require("../../models");

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res
    .status(201)
    .json({ message: "contact successfully added", result: newContact });
};

module.exports = add;
