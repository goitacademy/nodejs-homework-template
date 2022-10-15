const contactsOperations = require("../../models/contacts");

const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsOperations.updateById(id, req.body);
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

module.exports = updateById;