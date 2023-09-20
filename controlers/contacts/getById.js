const { getContactById } = require("../../models/contacts");

const getById = async (req, res, next) => {
    let id = req.params.contactId;
    let contact = await getContactById(id);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
};

module.exports = getById;
