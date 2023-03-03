const contactOperations = require("../models/contacts");

const { listContacts } = contactOperations;

const getConts = async (req, res, next) => {
  res.send("Это главный роутер");
  try {
    const contacts = await listContacts();
    res.json({
      status: 200,
      data: contacts,
      contacts,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getConts;
