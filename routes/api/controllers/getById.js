const contacts = require("../../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
