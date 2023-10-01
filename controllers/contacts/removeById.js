const { Contact } = require("../../models/");
const { ctrlWrapper } = require("../../helpers");
const { HttpError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove({ _id: contactId });

  if (!result) {
    throw HttpError(404, {
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: "Not Found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      message: "Contact deleted",
      contact: result,
    },
  });
};

module.exports = { removeById: ctrlWrapper(removeById) };
