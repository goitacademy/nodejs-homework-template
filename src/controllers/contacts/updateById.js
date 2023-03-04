const { Contact } = require("../../models/contacts");
const { requestError } = require("../../helpers/requestError");

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      throw requestError(404, "Not found");
    }

    res.json({
      status: "success",
      code: 200,
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
