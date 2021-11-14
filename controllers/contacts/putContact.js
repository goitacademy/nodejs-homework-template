const contactsOperation = require("../../model/oldFiles/index");
const CreateError = require("http-errors");

const putContacts = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.updateContact(contactId, req.body);
    if (!result) {
      throw new CreateError(404, `Contact with id-'${contactId}' not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = putContacts;
