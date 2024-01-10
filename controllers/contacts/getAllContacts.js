const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const query = { owner };

  const allContacts = await Contact.find(query).populate(
    "owner",
    "email subscription"
  );
  res.json(allContacts);
};

module.exports = getAllContacts;
