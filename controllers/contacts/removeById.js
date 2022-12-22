const constacts = require("../../models/contacts")

const HttpError  = require("../../helpers");

const removeById = async (req, res, next) => {
    const { id } = req.params;
    const result = await constacts.removeContact(id);

    if (!result) {
      throw HttpError(404, "Not Found");
    }

    res.status(200).json({
      message: "contact deleted"
    })

    // 204 - статус тіло не відправляє
    // res.json({
    //   message: "Delete success"
    // })
}

module.exports = removeById;