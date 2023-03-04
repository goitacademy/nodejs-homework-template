const { Contact } = require("../../models/contacts");

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    // Enabling { new: true } will return modified document rather than original.
    const result = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true },
    ).lean();

    if (!result) throw new Error("Not found");

    return res.json({
      status: "success",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
