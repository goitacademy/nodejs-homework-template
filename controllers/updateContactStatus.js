const { Contact } = require("../model/contact");
const updateContactStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contacts.updateContactStatus(
      contactId,
      req.body.favorite
    );
    if (result) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { result } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};
module.exports = updateContactStatus;
