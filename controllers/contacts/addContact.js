const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    status: "Success",
    code: 201,
    data: {
      contact,
    },
  });
};

module.exports = addContact;
