const { Contact } = require("../../models");
const createError = require("http-errors");

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw createError(404, `Not found`);
    }
    res.json({
      status: "Success",
      code: 200,
      message: "contact updated",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
