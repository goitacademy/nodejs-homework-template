const { Contact } = require("../../models/contact");

const { RequestError } = require("../../utils");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    result,
  });
};

module.exports = updateFavorite;
