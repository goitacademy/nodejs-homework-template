const { Contact } = require("../../models/contact");

const getAllController = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json({ message: "Success", contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllController,
};
