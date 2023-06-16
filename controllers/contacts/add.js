const Contact = require("../../models/contactModel");

const add = async (req, res) => {
  const contactNew = await Contact.create(req.body);

  console.log("contactNew", contactNew);
  res.status(201).json(contactNew);
};

module.exports = add;
