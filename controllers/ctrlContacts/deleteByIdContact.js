const { contactsService } = require("../../services");
const { isValidateNoNull } = require("../../helpers");

const deleteByIdContact = async (req, res) => {
  const {
    params: { contactId },
    user: { _id: owner },
  } = req;

  const result = await contactsService.removeContact(contactId, owner);
  await isValidateNoNull(result);

  res.json(`Contact by 'Id' - '${contactId}' deleted`);
};

module.exports = deleteByIdContact;