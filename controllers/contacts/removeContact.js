const createError = require("http-errors");

const contacts = require("../../models/contacts");

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw createError(400, "Not found");
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
