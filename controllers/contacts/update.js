const updateContact = require("../../service/contacts/updateContact.js");

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const contact = await updateContact(contactId, body);
    if (contact) {
      console.log(`Contact with id: ${contactId} has been updated.`);
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Contact updated",
        data: {
          contact,
        },
      });
    } else {
      console.log(
        `Contact with id: ${contactId} was not found in the contact database.`
      );
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact with id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {update};
