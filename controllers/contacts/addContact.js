const { addContact } = require("../../servises/contacts");

const addContactController = async (req, res, next) => {
  const newContact = req.body;
  console.log(newContact);

  if (!newContact) {
    return res.status(400).json({ message: "Missing fields" });
  }

  await addContact(newContact);
  res.json({ newContact, message: "Success, contact added" });
};

module.exports = {
  addContact: addContactController,
};
