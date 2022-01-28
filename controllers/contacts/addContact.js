const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "seccess",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
