const Contact = require("../../models/contact");
const HttpError = require("../../helpers/index");

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
  };

  module.exports = deleteById;