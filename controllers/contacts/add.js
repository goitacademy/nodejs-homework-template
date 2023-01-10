const contactsOperations = require("../../models/contactsOperations");

const add = async (req, res) => {
  let contactWithId;
  if (req.body.favorite) {
    contactWithId = await { ...req.body };
  } else {
    contactWithId = await { ...req.body, favorite: false };
  }
  const postedContact = await contactsOperations.addContact(contactWithId);
  res.status(201).json(postedContact);
};

module.exports = add;
