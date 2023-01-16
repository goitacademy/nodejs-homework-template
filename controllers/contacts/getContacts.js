const { Contact } = require("../../models/model");

async function getContacts(req, res) {
  try {
    const { limit } = req.query;
    const contacts = await Contact.find({}).limit(limit);

    res.status(200).json({ contacts });
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = getContacts;
