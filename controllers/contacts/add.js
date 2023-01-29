const { Contact } = require("../../models");
// const contacts = require("../../models/contacts.json");
// const { v4 } = require("uuid");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    ststus: "succses",
    code: 201,
    data: result,
  });
  //   const { name, phone, email } = req.body;
  //   contacts.push({ id: v4("3"), name, phone, email });
  //   res.status(201).json({
  //     code: 201,
  //   });
};

module.exports = addContact;
