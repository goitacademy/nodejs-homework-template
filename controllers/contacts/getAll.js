const Contact = require("../../models/contacts");

async function getAll(req, res) {
  const contacts = await Contact.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
}

module.exports = getAll;
