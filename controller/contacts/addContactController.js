const { addContactService } = require("../../servises/addContactService");

const addContactController = async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await addContactService(name, email, phone);
  res.status(201).json({ contact });
};

module.exports = addContactController;
