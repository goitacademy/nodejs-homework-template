const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId, req.body);

  if (!result) {
    throw new NotFound(`Contact with id = ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = removeById;
