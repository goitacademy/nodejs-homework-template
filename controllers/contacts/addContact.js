const Contact = require("../../model/contacts");

const addContact = async (req, res) => {
  try {
  } catch (error) {}
  const add = await Contact.create(req.body);
  res.status(201).json({
    status: "create",
    code: 201,
    result: add,
  });
};

module.exports = addContact;
