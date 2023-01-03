const { Contact } = require("../../models/contacts");

const addPost = async (req, res) => {
  const contacts = await Contact.create(req.body);

  res.status(201).json({ data: { contact: contacts } });
};

module.exports = addPost;
