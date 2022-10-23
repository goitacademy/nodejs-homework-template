const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");
const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json({ message: "contact delited" });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteById;
