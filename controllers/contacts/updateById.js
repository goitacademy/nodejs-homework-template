const { NotFound } = require("http-errors");
const { Contact } = require("../../model");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw new NotFound(`Product with id ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "missing fields",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
