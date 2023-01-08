const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!result) {
      throw createError(400, "Missing field favorite");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: result,
      },
    });
  } catch (error) {}
};

module.exports = updateStatusContact;
