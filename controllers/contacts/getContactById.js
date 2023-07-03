const Contact = require("../../models/contact.js");
const {HttpError} = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { id } = req.user;
  try {
    const contact = await Contact.findOne({
      _id: contactId,
      owner: id,
    });

    if (!contact) {
      throw new HttpError(404, "Not found");
    }
    console.log(`Contact with id: ${contactId} found`.success);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
