const contactOperations = require("../../models");
const createError = require("http-errors");

const add = async (req, res, next) => {
  try {
    const result = await contactOperations.addContact(req.body);
    if (!result) {
      throw createError(404, `Bad request`);
    }

    res.status(201).json({
      status: "Success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
