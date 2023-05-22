const User = require("../../models/user");

const addContact = async (req, res) => {
  const { user } = req;
  const { id: constactID } = req.body;

  user.contacts.push({ _id: constactID });
  await User.findByIdAndUpdate(user._id, user);

  return res.status(201).json({ contacts: user.contacts });
};

module.exports = addContact;
