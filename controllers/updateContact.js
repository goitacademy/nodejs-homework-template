const createError = require("../helpers");
const { Contact } = require("../models");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = updateContact;
