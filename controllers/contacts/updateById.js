/* eslint-disable no-undef */
const { Contact } = require("../../models");

const updateById = async (req, res, next) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
