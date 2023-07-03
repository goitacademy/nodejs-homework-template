const Contact = require("../../models/contact.js");
const {HttpError} = require("../../helpers");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { id } = req.user;

  try {
    const contact = await Contact.findOneAndRemove({
      _id: contactId,
      owner: id,
    });
    if (!contact) {
      throw new HttpError(404, "Not found");
    }
    console.log(`Contact with id: ${contactId} deleted`.success);
    res.status(200).json("Contact deleted");
  }catch (error) {
    next(error);
  }
};

module.exports = removeContact;
