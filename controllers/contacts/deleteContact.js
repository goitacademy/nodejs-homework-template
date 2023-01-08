const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await Contact.findByIdAndRemove(contactId);
    if (!removedContact) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result: removedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
