const {  Contact } = require("../../models/contact/contact");

const getContacts = async (req, res) => {
  const result = await Contact.find({}, '-createdAt -updatedAt').exec();
  res.send(result);
};

module.exports = getContacts;
