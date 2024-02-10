const getContact = async (req, res, next) => {
  const { user } = req;
  const { contacts } = user;
  res.json({ contacts });
};

module.exports = getContact;
