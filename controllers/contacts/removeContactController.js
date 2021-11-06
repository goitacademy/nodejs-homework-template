const { NotFound } = require("http-errors");
// const contactsOperations = require("../../model/contacts");
const { Product } = require("../../models");
const removeContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await Product.findByIdAndRemove(contactId);
    if (!deleteContact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "Remove success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContactController;
