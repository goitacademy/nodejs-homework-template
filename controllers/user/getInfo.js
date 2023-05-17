const getInfo = (req, res) => {
  const { user } = req;
  const { email, contacts } = user;

  return res.status(201).json({ email, contacts });
};

module.exports = getInfo;
