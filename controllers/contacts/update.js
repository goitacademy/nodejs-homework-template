const contactsOperations = require("../../models/contacts");

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contactsOperations.updateContact(
    contactId,
    req.body
  );
  res.status(200).json({
    status: "success",
    code: "200",
    data: { result: updatedContact },
  });
};

module.exports = update;
