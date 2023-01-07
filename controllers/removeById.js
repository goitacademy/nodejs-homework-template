const contacts = require("../models/contacts");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
