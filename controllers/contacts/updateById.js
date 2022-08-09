const { updateContact } = require("../../models/contacts");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      updatedContact,
    },
  });
};

module.exports = updateById;
