const { NotFound } = require("http-errors");
const contactsOperations = require("../../model/contacts");
const updateByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.updateById(contactId, req.body);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateByIdController;
