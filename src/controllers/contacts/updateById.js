const { Contact } = require("../../models/index");
const { requestError } = require("../../helpers/requestError");

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
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
