// GET all contacts
const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const get = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const result = await Contact.find({ owner }).populate("owner", "email");
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
