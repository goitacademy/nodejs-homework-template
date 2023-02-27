const createError = require("http-errors");
const { updateFavoriteContact } = require("../../schema");
const { modelContact } = require("../../models");
const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateFavoriteContact.validate(req.body);
    if (error) {
      throw createError(400, `missing failed ${error.message}`);
    }

    const { contactId } = req.params;
    const result = await modelContact.Contact.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
      }
    );
    if (!result) {
      throw createError(404, `Not found ${contactId}`);
    }
    return res.json({ status: "success", code: 200, data: { result } });
  } catch (err) {
    next(err);
  }
};
module.exports = updateStatusContact;
