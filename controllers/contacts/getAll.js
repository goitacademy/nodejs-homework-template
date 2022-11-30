const { getContacts } = require("../../models/contacts");

async function getAll(req, res) {
  const contacts = await getContacts();

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
}

module.exports = getAll;
