const contactsBook = require("../../models/contacts.js");
const errorMessage = require("../../helpers/errorMessage.js");

const updateStatusContact = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const result = await contactsBook
      .findByIdAndUpdate(id, req.body, { new: true })
      .exec();
    if (result === null) {
      throw errorMessage(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
