const contactsOperation = require("../../model/oldFiles/index");
const CreateError = require("http-errors");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.removeContact(contactId, req.body);
    if (!result) {
      throw new CreateError(404, `Contact with id-'${contactId}' not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "Remove success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
