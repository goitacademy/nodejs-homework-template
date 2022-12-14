
const { Contacts } = require("../models/contacts");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndRemove(contactId);
  try {
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteContact };
