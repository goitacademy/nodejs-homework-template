const User = require("../../models/user");

const addContact = async (req, res) => {
  const { user } = req;
  const { id: constactID } = req.body;

  user.contacts.push(constactID);
  const updateUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
  });

  return res.status(201).json({ contacts: updateUser.contacts });
};

module.exports = addContact;
