const { Contact } = require("../../models/contact");

const {HttpError}  = require("../../helpers");

const removeById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      throw HttpError(404, "Not Found");
    }

    res.status(200).json({
      message: "contact deleted"
    })

}

module.exports = removeById;