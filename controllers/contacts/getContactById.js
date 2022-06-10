const { Contact } = require("../../models/contact");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await Contact.findById(contactId);
    if (!contactById) {
      res.status(404).json({ message: "contact not found" });
    } else {
      res.status(200).json(contactById);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
