const { addContact } = require("../../models/contacts");

async function postContactController(req, res) {
  const newContact = await addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
}

module.exports = postContactController;
