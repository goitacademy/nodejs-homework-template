const { Contact } = require("../../models");

const getAllContacts = async (_, res) => {
  console.log(Contact);
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  console.log(contacts);
  res.json({ status: "succsess", code: 200, data: contacts });
};

module.exports = getAllContacts;