const contactOperations = require("../../models");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactOperations.getContactById(contactId);
    if (!contactById) {
      throw createError(404, `Not found contact with id:${contactId}`);
    }
    res.json({
      status: "Success",
      code: 200,
      result: contactById,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;