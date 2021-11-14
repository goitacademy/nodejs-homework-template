const CreateError = require("http-errors");
const contactsOperation = require("../../model/oldFiles/index");

const getContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.getContactById(contactId);
    if (!result) {
      throw new CreateError(404, `Contact with id-'${contactId}' not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactId;
