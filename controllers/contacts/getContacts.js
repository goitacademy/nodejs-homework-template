const { Contact } = require("../../models");
const { wrapper } = require("../../helpers");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.find({owner});

  res.json(result);
};

module.exports = wrapper(getContacts);
