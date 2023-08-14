const ctrlWrapper = require("../../utils/ctrlWrapper");

const {
    findOneContact
  } = require("../../services/contactServices");


const getOneContact = async (req, res) => {
    const foundContact = await findOneContact(req.params.contactId);
    res.json(foundContact);
  };

module.exports = {getOneContact: ctrlWrapper(getOneContact)};