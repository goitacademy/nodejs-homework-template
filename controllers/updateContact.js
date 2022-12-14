const { Contacts } = require("../models/contacts");

const update = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: "Contact updated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { update };
