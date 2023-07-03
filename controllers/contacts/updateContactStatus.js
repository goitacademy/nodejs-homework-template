const Contact = require("../../models/contact.js");
const {HttpError} = require("../../helpers");

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { id } = req.user;

  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: id },
      { ...req.body },
      { new: true }
    );
    if (!contact) {
      throw new HttpError(404, "Not found");
    }
    console.log("Status updated".success);
    res.status(200).json({ message: "Status updated", contact });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactStatus;
