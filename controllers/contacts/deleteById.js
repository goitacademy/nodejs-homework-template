const contactsOperations = require("../../models/contacts");

const { NotFound } = require("http-errors");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsOperations.removeContact(id);
  if (!contact) {
    throw new NotFound(`Product with id=${id} not found`);
  }
  res.json({
    status: "success",
    message: "contact deleted",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = deleteById;