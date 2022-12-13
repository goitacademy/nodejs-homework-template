const createError = require("http-errors");
const contactsModel = require("../../services/contacts");

const updateById = async (req, res) => {
  const {contactId} = req.params;
  const contact = await contactsModel.updateById(contactId, req.body);
  if (!contact) {
    throw createError(404, `Contact by id: ${contactId} hasn't been found`);
  }

  res
    .status(200)
    .json({
      data: {contact},
      message: `Contact by id: ${contact.id} has been update`,
    });
};

module.exports = updateById;
