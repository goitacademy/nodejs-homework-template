const { Contact } = require("../../models/contacts");

const addPost = async (req, res) => {
  const { _id } = req.user;
  const contacts = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({ data: { contact: contacts } });
};

module.exports = addPost;
