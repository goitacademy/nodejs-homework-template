const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await Contact.findById(contactId);
    if (!data) {
      throw createError(404);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
