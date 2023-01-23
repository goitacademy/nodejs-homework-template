const contactOperations = require("../../models");
const createError = require("http-errors");

const remove = async (req, res, next) => {
  try {
    console.log(req.params);
    const { contactId } = req.params;
    const result = await contactOperations.removeContact(contactId);
    if (!result) {
      throw createError(404, `Not found contact with id:${contactId}`);
    }
    res.json({
      status: "Success",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
