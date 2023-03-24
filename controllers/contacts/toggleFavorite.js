const { Contact } = require("../../models/contact");

const { IdError, MissingFieldsError } = require("../../errorHandlers/");

const toggleFavorite = async (req, res) => {
  console.log(req.body);

  if (Object.keys(req.body).length === 0) {
    throw new MissingFieldsError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) {
    throw new IdError(contactId);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};
module.exports = toggleFavorite;
