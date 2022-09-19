const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const changeById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = await contactsOperations.changeContact(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = changeById;
