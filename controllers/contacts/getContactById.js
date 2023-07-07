const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(
    contactId,
    "-createdAt -updatedAt"
  ).populate("owner", "email subscription ");

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    data: result,
  });
};

module.exports = getContactById;
