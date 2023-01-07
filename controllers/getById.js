const contacts = require("../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
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

module.exports = getById;
