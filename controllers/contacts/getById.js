const { NotFound } = require("http-errors");

const { getContactById } = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      throw new NotFound(`Contact with id=${id} not found`);
      // или
      // throw createError(404, `Contact with id=${id} not found`);
      // или
      // const error = new Error(`Contact with id=${id} not found`);
      // error.status = 404;
      // throw error;
      // или
      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: `Contact with id=${id} not found`,
      // });
      // return;
    }
    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: "Server error",
    // });
  }
};

module.exports = getById;
