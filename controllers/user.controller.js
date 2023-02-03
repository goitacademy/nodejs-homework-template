const { User } = require("../models/user");
const path = require("path");
const fs = require("fs/promises");

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

async function updateAvatar(req, res, next) {
  const { filename } = req.file;
  const tmpPath = await path.resolve(__dirname, "../tmp", filename);
  const publicPath = await path.resolve(
    __dirname,
    "../public/avatars",
    filename
  );
  try {
    await fs.rename(tmpPath, publicPath);

    const userId = req.user._id;

    const avatarURL = `/avatars/${filename}`;

    const updateAvatar = await User.findByIdAndUpdate(
      userId,
      { avatarURL },
      { new: true }
    );
    return res.status(200).json({ avatarURL: updateAvatar.avatarURL });
  } catch (error) {
    await fs.unlink(tmpPath);
    return res.status(401).json({ message: "Not authorized" });
  }
}

module.exports = {
  createContact,
  getContacts,
  current,
  updateAvatar,
};
