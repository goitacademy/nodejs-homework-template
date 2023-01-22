const { User } = require("../models/user");

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;
  user.contacts.push({ _id: contactId });

  await User.findByIdAndUpdate(user._id, user);

  return res.status(201).json({
    data: { contacts: user.contacts },
  });
}

async function getContacts(req, res, next) {
  const { user } = req;
  const userWithContacts = await User.findById(user._id).populate("contacts", {
    name: 1,
    email: 1,
    _id: 1,
  });

  return res.status(201).json({
    data: {
      contacts: userWithContacts.contacts,
    },
  });
}

async function current(req, res, next) {
  const { user } = req;
  console.log(req.user);
  const { email, _id: id, subscription } = user;
  return res.status(201).json({
    data: { user: { email, id, subscription } },
  });
}
module.exports = {
  createContact,
  getContacts,
  current,
};
