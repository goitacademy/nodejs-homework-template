const { contactsService } = require("../../services");
const { isValidateNoNull, setApiErrorStatus } = require("../../helpers");

const updateByIdStatusContact = async (req, res) => {
  const {
    params: { contactId },
    user: { _id: owner },
    body: { favorite },
  } = req;

  if (favorite === undefined) {
    return setApiErrorStatus(400, "Missing favorites field");
  }

  const result = await contactsService.updateContact(contactId, owner, {
    favorite,
  });

  res.json(isValidateNoNull(result));
};

module.exports = updateByIdStatusContact;