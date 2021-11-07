const { NotFound } = require("http-errors");
// const contactsOperations = require("../../model/contacts");
const { Product } = require("../../models");
const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Product.findById(contactId);
    if (!contact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getContactByIdController;
