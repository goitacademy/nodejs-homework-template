const createError = require("http-errors");
const { modelContact } = require("../../models");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await modelContact.Contact.findById(contactId);
    if (!contacts) {
      throw createError(404, `Contacts with ${contactId} not found`);
    }
    return res.json({
      status: "success",
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getById;