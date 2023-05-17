const getContacts = (req, res) => {
  const { user } = req;
  const { contacts } = user;

  res.json(contacts);
};

module.exports = getContacts;
