const {HttpError} = require("../../helpers");
const { Contact } = require("../../models/contact/contactModel");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const data = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
    new: true,
    projection: "-createdAt -updatedAt"
  }
  ).populate("owner", "name email");

    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(data);
}

module.exports = updateContactById;