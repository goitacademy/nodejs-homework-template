const { Contact } = require("../../models/contact");

async function listContacts(req, res) {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
}

module.exports = listContacts;
