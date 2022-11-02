const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw new NotFound(`Not found id=${contactId}`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = deleteContactById;
