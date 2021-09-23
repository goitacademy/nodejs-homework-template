const contactsOperations = require("../../model/contacts");
// const contactsSchema = require("../../schemas/contacts");
const { NotFound } = require("http-errors");
const { sendSuccessResponse } = require("../../utils");

const updateContactsById = async (req, res) => {
  // const { error } = contactsSchema.validate(req.body);//в validation
  // if (error) {
  //   const err = new Error(error.message);
  //   err.status = 400;
  //   throw err;
  // }
  const { contactId } = req.params;
  const contact = await contactsOperations.updateContactById(
    contactId,
    req.body
  );
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessResponse(res, { contact });
  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     contact,
  //   },
  // });
};
module.exports = updateContactsById;
