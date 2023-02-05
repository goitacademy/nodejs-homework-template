const { addContactService } = require("../../servises/addContactService");

const addContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const contact = await addContactService(name, email, phone, favorite);
  res.status(201).json({ contact });
};

module.exports = addContactController;
