const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helperss");

const listContacts = async (req, res, next) => {
  const { id: owner } = req.user;

  try {
    const contacts = await Contact.find({ owner }, "-createdAt -updatedAt");
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
