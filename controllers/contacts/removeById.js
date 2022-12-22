const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "product deleted",
    data: {
      result,
    },
  });
};

module.exports = removeById;
