const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const removeProduct = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result },
  });
};

module.exports = removeProduct;
