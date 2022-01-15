const { NotFound } = require("http-errors");
const { Contact } = require("../../model");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    // const contact = await Contact.findOne({ _id: contactId });
    const result = await Contact.findById(contactId);

    if (!result) {
      throw new NotFound(`Product with id ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getById;
