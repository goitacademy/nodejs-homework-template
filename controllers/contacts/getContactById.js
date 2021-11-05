const { Contact } = require("../../model");
const { NotFound } = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await Contact.findById(contactId);
    if (!data) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getById;
