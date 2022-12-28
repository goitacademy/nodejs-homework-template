const { addContact } = require("../../service/contacts");

const postAddContactController = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json({ message: data });
};
module.exports = postAddContactController;
