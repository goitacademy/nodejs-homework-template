const Contact = require("../../models/contact");
const HttpError = require("../../helpers/HttpError");

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }
    res.json(result);
  };

  module.exports = updateStatusContact;