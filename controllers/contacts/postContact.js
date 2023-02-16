const { addContact } = require('../../models/index');

const postContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { _id } = req.user;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required name field' });
  }

  const newContact = await addContact({ name, email, phone, owner: _id });
  if (newContact === null) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  res.status(200).json({ newContact });
};

module.exports = { postContact };
