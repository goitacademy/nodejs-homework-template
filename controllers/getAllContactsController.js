const { listContacts } = require("../models/contacts");

const getAllController = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({ message: "Success", contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllController,
};
