const Contact = require("../../models/contact");

const add = async (req, res) => {
  const { _id } = req.body;
  const addContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    data: {
      addContact,
    },
  });
};

module.exports = add;
