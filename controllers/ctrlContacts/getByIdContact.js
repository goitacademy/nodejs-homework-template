const { contactsService } = require("../../services");
const { isValidateNoNull } = require("../../helpers");

const getByIdContact = async (req, res) => {
  const {
    params: { contactId },
    user: { _id: owner },
  } = req;

  const result = await contactsService.getOneContact(contactId, owner);

  res.json(isValidateNoNull(result));
};

module.exports = getByIdContact;