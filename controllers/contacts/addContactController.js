const { addContact } = require("../../service/contacts");

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await addContact(req.body, owner);
  res.status(201).json({ status: "success", data });
};

module.exports = addContactController;
