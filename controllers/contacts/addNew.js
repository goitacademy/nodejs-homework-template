const { Contact } = require("../../models/contact");

const addNew = async (req, res) => {
  const newContact = {
    ...req.body,
  };
  console.log("newContact", newContact);
  const result = await Contact.create(newContact);
  res.status(201).json(result);
};

module.exports = addNew;
