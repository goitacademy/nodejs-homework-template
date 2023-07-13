const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200);
  res.json({
    code: 200,
    message: "Update contact ",
    data: result,
  });
};

module.exports = updateContact;
