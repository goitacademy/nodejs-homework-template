const createError = require("http-errors");
const { modelContact } = require("../../models");

const deleteContacts = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await modelContact.Contact.findByIdAndRemove(contactId);
    if (!contact) {
      throw createError(404, `${contactId} not found`);
    }
    res.json({
      status: "success",
      message: "contact deleted",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteContacts;