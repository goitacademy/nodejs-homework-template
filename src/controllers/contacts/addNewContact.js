const { addContact } = require("../../models/contacts");

const add = async (req, res, next) => {
  const data = await addContact(req.body);
  res.status(201).json({ data, status: 201, message: "operation successful" });
};

module.exports = {
  add,
};
