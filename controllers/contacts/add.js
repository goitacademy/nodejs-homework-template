 const Contact = require('../../models/contactModel');
//  const { addContact } = require("../../models/contacts");

const add = async (req, res) => {
  //  const contactNew = await addContact(req.body);

  // console.log('first',Contact.create)
  const contactNew = await Contact.create(req.body);

  console.log('contactNew', contactNew);
  res.status(201).json(contactNew);
};

module.exports = add;
