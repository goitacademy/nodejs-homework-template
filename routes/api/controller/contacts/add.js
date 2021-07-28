const { Contact } = require("../../models/index");

const add = async (req, res, next) => {
  const { body } = req;

  try {
    const result = await Contact.create(body);
    if (!result) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
    }
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      error.code = 400;
    }
    next(error);
  }
};

module.exports = add;
