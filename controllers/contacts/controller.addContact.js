// const { addContact } = require("../../models/contacts");
const { Contact } = require("../../models");

exports.addContact = async (req, res) => {
  const body = req.body;
  if (!body.favorite) {
    body.favorite = false;
  }

  // res.status("201").json(await addContact(body));
  res.status("201").json(await Contact.create(body));
};
