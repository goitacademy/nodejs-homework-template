const contactsBook = require("../../models/contacts.js");
const errorMessage = require("../../helpers/errorMessage.js");

const getById = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const result = await contactsBook.findById(id).exec();
    if (result === null) {
      throw errorMessage(404, "Not found");
    }
    // if (result.owner.toString() !== req.user.id) {
    //   throw errorMessage(404, "Not found");
    // }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
