const { Contact } = require("../../models");

const addContact = async (req, res) => {
  // const { name, email, phone } = req.body;
  const result = await Contact.create(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    message: `contact posted`,
    data: { result },
  });
};

module.exports = addContact;
