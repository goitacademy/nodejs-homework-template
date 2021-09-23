const contactsOperations = require("../../model/contacts");
const { NotFound } = require("http-errors");
const { sendSuccessResponse } = require("../../utils");

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.removeContactById(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
    // const error = new Error(`Product with id=${contactId} not found`);
    // error.status = 404;
    // throw error;
  }
  sendSuccessResponse(res, { message: "Success delete", contact });
  // res.json({
  //   status: "success",
  //   code: 200,
  //   message: "Success delete",
  // });
};

module.exports = removeContactById;
