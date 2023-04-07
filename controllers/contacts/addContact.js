const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const result = await Contact.create({ name, email, phone });
  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
