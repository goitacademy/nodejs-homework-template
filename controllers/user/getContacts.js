// const User = require("../../models/user");

const getContacts = (req, res) => {
  const { user } = req;
  const { contacts } = user;

  // const userContacts = await User.findById(user._id).populate("contacts", {
  //   email: 1,
  // });

  // res.json({ contacts: userContacts.contacts });

  res.json(contacts);
};

module.exports = getContacts;
