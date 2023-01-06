const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;

  const contact = await Contact.create({ ...req.body, owner });

  res.json({
    status: "Success",
    code: 201,
    message: "Contact was added",
    data: { contact },
  });
};

module.exports = addContact;
