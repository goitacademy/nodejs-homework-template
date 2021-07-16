const { Contact } = require("../../utils/models");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body: fields } = req;

  try {
    const result = await Contact.findByIdAndUpdate(contactId, fields, {
      new: true,
    });
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
