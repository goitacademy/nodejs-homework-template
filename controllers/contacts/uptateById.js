const contactsOperation = require("../../models/contacts");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.updateContact(contactId, req.body);
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateById;
