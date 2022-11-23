const { NotFound } = require("http-errors");
const contactsOperations = require("../../models/contactsFunctions");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);

  if (!result) {
    throw NotFound(`Contact with id = ${contactId} not found`);
    // res.status(404).json({
    //   status: "error",
    //   code: 404,
    //   message: `Contact with id = ${contactId} not found`,
    // });
    // return;
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactById;
