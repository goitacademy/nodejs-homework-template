const { NotFound } = require("http-errors");
const { updateContact } = require("../../model");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      throw new NotFound(`Product with id ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "missing fields",
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
