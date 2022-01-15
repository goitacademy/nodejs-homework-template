const { NotFound } = require("http-errors");
const { Contact } = require("../../model");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw new NotFound(`Product with id ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: `Contact with id ${contactId} deleted`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
