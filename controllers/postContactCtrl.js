const { contacts } = require("../models/contacts");

const postContactCtrl = async (req, res) => {
  const addContact = await contacts.addContact(req.body);
  res.status(201).json({
    status: "Success",
    code: 201,
    data: {
      result: addContact,
    },
  })
};

module.exports = postContactCtrl