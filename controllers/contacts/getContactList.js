const ctrlWrapper = require("../../utils/ctrlWrapper");

const {
    findContacts
  } = require("../../services/contactServices");

const getContactList = async (req, res) => {
    const {_id: owner} = req.user;
    const contactList = await findContacts({owner});
    res.json(contactList);
};

module.exports = {getContactList: ctrlWrapper(getContactList)};