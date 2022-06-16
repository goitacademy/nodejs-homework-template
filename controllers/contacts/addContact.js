const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { body } = req;
  const { _id } = req.user;

  const result = await Contact.create({ ...body, owner: _id });

  res.status(201).json({
    status: 201,
    data: { result },
  });
};

module.exports = addContact;
