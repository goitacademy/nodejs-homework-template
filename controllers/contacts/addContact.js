/* eslint-disable quotes */
/* eslint-disable semi */
const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { _id } = req.user;
  const addContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: addContact,
  });
};

module.exports = addContact;
