// GET all contacts
const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const get = async (req, res, next) => {
  try {
    const result = await Contact.find();
    if (!result) {
      throw createError(500);
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = get;
