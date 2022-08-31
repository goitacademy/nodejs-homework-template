const { Contact } = require("../../models/Contact");
const { createError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const owner = req.user._id;
    const result = await Contact.findOne({ _id, owner });
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
