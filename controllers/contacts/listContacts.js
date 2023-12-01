const listContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  console.log();
  res.send(contacts);
};

module.exports = listContacts;