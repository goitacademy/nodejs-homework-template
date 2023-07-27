const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const editContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = editContact;
