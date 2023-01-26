const Contact = require("../../models/contact");

const add = async (req, res) => {
  const body = req.body;
  const addContact = await Contact.create(body);
  res.status(201).json({
    data: {
      addContact,
    },
  });
};

module.exports = add;
