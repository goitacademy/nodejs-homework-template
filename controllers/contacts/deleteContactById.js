const {HttpError} = require("../../helpers");
const { Contact } = require("../../models/contact/contactModel");

const deleteContactById =  async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const data = await Contact.findByIdAndDelete(
    { _id: contactId, owner }
  ).populate("owner", "name email");;

    if (!data) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({"message": "contact deleted"});
}

module.exports = deleteContactById;