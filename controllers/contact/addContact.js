const { Contacts } = require("../../repositories");

const addContact = async (req, res, _next) => {
  const newContact = { ...req.body, owner: req.user._id };
  const result = await Contacts.addContact(newContact);
  return res.status(201).json({
    status: "success",
    code: 201,
    data: { result },
  });
};

module.exports = addContact;
