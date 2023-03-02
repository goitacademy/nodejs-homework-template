const { Contact } = require("../../models/contacts");
const { requestError } = require("../../helpers/requestError");

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    await Contact.updateOne({ _id: contactId }, req.body);

    const result = await Contact.findById(contactId);
    if (!result) {
      throw requestError(404, "Not found");
    }

    res.json({
      status: "success",
      code: 200,
      data: { data: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
