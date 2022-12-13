const contactsModel = require("../../services/contacts");
const createError = require("http-errors");

const delById = async (req, res) => {
  const {contactId} = req.params;
  const contact = await contactsModel.delById(contactId);

  if (!contact) {
    throw createError(404, `Contact by id: ${contactId} hasn't been found`);
  }

  res
    .status(200)
    .json({
      data: {contact},
      message: `Contact by id: ${contact.id} has been deleted`,
    });
};

module.exports = delById;
