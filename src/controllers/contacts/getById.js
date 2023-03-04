const { Contact } = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId).lean();

    if (!result) throw new Error("Not found");

    return res.json({
      status: "success",
      data: { result },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = getById;
