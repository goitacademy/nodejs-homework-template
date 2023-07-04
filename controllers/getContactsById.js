const { getContactById } = require("../models/contacts");

const getContactsById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);

    contactById.length !== 0
      ? res.status(200).json(contactById)
      : res
          .status(404)
          .json({ message: `Contact by ID ${contactId}: not found` });
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};

module.exports = {
  getContactsById,
};
