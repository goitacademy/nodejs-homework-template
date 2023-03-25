// GET one contact by id
const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Contact.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      throw createError(404);
      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: `Not found contact id: ${id}`,
      //   data: "Not Found",
      // });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = getById;
