const { Contact } = require("../models");
const createError = require("../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ status: "success", code: 200, payload: { result } });
  } catch (error) {
    next(error);
  }
};
module.exports = getContactById;
