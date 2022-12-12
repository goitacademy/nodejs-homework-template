const { updateContact } = require("../models/contacts");

const update = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await updateContact(contactId, req.body);
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
