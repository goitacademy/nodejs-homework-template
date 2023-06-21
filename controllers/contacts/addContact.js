const { Contact } = require('../../models/contact');
const path = require('path');
const fs = require('fs/promises');

// const contactDir = path.resolve('public', 'avatars');

const addContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    // const { path: oldPath, filename } = req.file;
    // const newPath = path.join(contactDir, filename);
    // await fs.rename(oldPath, newPath);
    // const avatar = path.join('public', 'avatars', filename);
    const result = await Contact.create({ ...req.body, 
      // avatar, 
      owner });

    console.log('Contact added!');
    // console.log(avatar);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
