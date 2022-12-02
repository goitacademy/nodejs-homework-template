const Contact = require("../../models/contacts");

async function add(req, res) {
  const newContact = await Contact.create(req.body);

  res.json({
    status: "success",
    code: 201,
    data: newContact,
  });
}

module.exports = add;
