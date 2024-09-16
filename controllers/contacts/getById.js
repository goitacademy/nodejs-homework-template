const { NotFound } = require("http-errors");
const { contactsOperations } = require("../../models");

const getById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    // const error = new Error(`Contact with id=${contactId} Not found`);
    // error.status = 404;
    // throw error;

    throw new NotFound(`Contact with id=${contactId} Not found`);
  }
  res.json({ status: "success", code: 200, contact });
};

module.exports = getById;
