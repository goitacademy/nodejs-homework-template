const Contact = require("../models/model_contact");
const { HttpError } = require("../helpers");

const updateFavoriteCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body
  const contactUpdate = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
  if (!contactUpdate) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "Success",
    code: 200,
    data: {
      result: contactUpdate,
    },
  });
};

module.exports = updateFavoriteCtrl;