const { Contact } = require("../../models/contacts");
const { NotFound } = require("http-errors");



const deleteContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      if (!result) {
        throw new NotFound("Not found, can't delete");
      }
      res.status(200).json({
        code: 200,
        message: "contact deleted",
      });
    } catch (error) {
      next(error);
    }
  }

  module.exports = deleteContact;