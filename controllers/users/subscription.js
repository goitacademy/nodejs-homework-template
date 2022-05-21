const { isValidObjectId } = require("mongoose");
const { createError } = require("../../helpers");
const { User } = require("../../models/user");

const subscription = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isValid = isValidObjectId(contactId);
    if (!isValid) {
      throw createError(404);
    }
    const updateUsers = await User.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!updateUsers) {
      throw createError(404);
    }
    res.json(updateUsers);
  } catch (error) {
    next(error);
  }
};

module.exports = subscription;
