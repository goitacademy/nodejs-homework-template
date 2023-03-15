// const { listContacts } = require("../../models/contacts");
const { Contact } = require("../../models");

exports.listContacts = async (req, res, next) => {
  // try {
  // res.status("200").json(await listContacts());
  res.status("200").json(await Contact.find({}));

  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};
