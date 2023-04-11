const { listContacts } = require("../models/contacts");

const checkMid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contact.id === `${id}`);
    if (!contact) {
      res.status(404).json({
        message: "Not found",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = checkMid;
