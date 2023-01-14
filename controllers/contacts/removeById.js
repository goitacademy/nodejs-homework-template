const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw new NotFound(`Contact with id:${id} was not found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact was successfully deleted!",
      data: {
        contact: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
