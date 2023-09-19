const { removeContact } = require("../../models/contacts");

const removeById = async (req, res, next) => {
    let id = req.params.contactId;
    let result = await removeContact(id);

    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
};

module.exports = removeById;
