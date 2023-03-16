const { getContactById } = require("../models/contacts");

const getContactsById = async (req, res) => {
  try {
    const { _id:owner } = req.user;
    const { contactId } = req.params;
    const contactById = await getContactById(contactId,owner);

    contactById.length !== 0
      ? res.status(200).json(contactById)
      : res
          .status(404)
          .json({ message: `Contact by ID ${contactId}: not found` });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

//

module.exports = {
  getContactsById,
};
