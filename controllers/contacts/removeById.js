const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      massage: "contact deleted",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
