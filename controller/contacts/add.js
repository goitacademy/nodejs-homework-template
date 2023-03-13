const { Contact } = require("../../models/contact");
const fs = require("fs/promises");
const path = require("path");

const contactAvatarsDir = path.join(
  __dirname,
  "../",
  "../",
  "public",
  "avatars"
);
const add = async (req, res) => {
  const { path: tempDir, originalname } = req.file;
  const { _id: owner } = req.user;
  const resultUpload = path.join(contactAvatarsDir, originalname);
  await fs.rename(tempDir, resultUpload);
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = add;
