const contactsOperations = require("../../models/contacts");

const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsOperations.getContactById(id);
  if (!contact) {
    throw new NotFound(`Product with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = getById;