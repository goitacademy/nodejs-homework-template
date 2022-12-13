const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "missing fieleds");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
}

module.export = updateContact;
