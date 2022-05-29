const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.updateContact(id, req.body);
  if (!result) {
    throw NotFound(`Contact with id=${id} not found`, req.body);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateById;
