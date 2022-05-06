const { Contact } = require("../../models/contact");

const getContacts = async (req, res, next) => {
  const { _id } = req.user;
  const result = await Contact.find(
    { owner: _id },
    "-createdAt -updatedAt"
  ).populate("owner", "email");
  res.json(result);
};

module.exports = getContacts;
