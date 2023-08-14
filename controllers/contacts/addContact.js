const fs = require("fs/promises");
const path = require("path");
const contactsDir = path.resolve("public", "posters");
const Jimp = require("jimp");

const Contact = require("../../models/contact");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: tempPath, filename } = req.file;

  const jimpRead = await Jimp.read(tempPath);
  const jimpResized = await jimpRead.resize(250, 250);
  await jimpResized.write(tempPath);

  const newPath = path.join(contactsDir, filename);

  await fs.rename(tempPath, newPath);
  const posterURL = path.join("posters", filename);
  const result = await Contact.create({ ...req.body, posterURL, owner });
  res.status(201).json(result);
};

module.exports = addContact;
