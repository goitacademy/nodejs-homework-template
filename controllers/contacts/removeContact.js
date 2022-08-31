const { Contact } = require("../../models/Contact");
const { createError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const owner = req.user._id;
    const result = await Contact.findOneAndDelete({ _id, owner });
    if (!result) {
      throw createError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
