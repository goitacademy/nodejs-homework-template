const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const uptadeContactById = async (req, res) => {
  const { contactId } = req.params;

  const updatedСontact = await contactsOperations.updateContact(
    contactId,
    req.body
  );

  if (!updatedСontact) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: "succsess",
    code: 200,
    data: updatedСontact,
  });
};

module.exports = uptadeContactById;