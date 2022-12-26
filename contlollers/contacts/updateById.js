const contactOperations = require("../../models/contacts");

const updateById = async (req, res, next) => {
  const { body } = req;

  const { contactId } = req.params;
  const contact = await contactOperations.updateContact(contactId, body);
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

module.exports = updateById;
