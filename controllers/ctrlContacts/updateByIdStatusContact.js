const { contactsService } = require("../../services");
const { isValidNoNull, setApiErrorStatus } = require("../../helpers");

const updateByIdStatusContact = async (req, res) => {
  const {
    body: { favorite },
    params: { contactId },
  } = req;

  if (favorite === undefined) {
    return setApiErrorStatus(400, "Missing field favorite");
  }

  const result = await contactsService.updateStatusContact(contactId, {
    favorite,
  });

  res.json(isValidNoNull(result));
};

module.exports = updateByIdStatusContact;
