const { BadRequest } = require("http-errors");

const { Contact } = require("../../models/contact");

async function updateFavorite(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new BadRequest("missing fields");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
}

module.exports = updateFavorite;
