// const { listContacts } = require("../../models/contacts");
const { Contact } = require("../../models");

exports.listContacts = async (req, res) => {
  // res.status("200").json(await listContacts());
  res.status("200").json(await Contact.find({}));
};
