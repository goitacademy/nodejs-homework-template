const User = require("../../models/users");

const addContact = async (req, res, next) => {
  const { user } = req;
  const { id: contactId } = req.body;

  const existingContact = await User.findById(contactId);
  if (!existingContact) {
    return res.status(404).json({ error: "Contact not found" });
  }

  if (user.contacts.includes(contactId)) {
    return res
      .status(400)
      .json({ error: "Contact already exists in user's contacts" });
  }

  user.contacts.push(contactId);

  await User.findByIdAndUpdate(user._id, user);
  res.json({ contacts: user.contacts });
};

module.exports = addContact;
