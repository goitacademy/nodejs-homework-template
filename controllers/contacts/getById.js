const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../utils");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found contact");
  }
  return res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};
module.exports = getById;
