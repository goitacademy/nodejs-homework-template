const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!updateContact) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: updateContact,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = updateContact;
