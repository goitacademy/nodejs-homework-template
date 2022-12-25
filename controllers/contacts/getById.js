const { Contact } = require("../../models");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      throw createError(404, `Contact with ID: ${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;