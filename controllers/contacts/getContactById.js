const { Contact } = require("../../models");
const { createError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
      throw createError(404);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
