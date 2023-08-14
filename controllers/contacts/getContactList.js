const ctrlWrapper = require("../../utils/ctrlWrapper");

const {
    findContacts
  } = require("../../services/contactServices");

const getContactList = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    
    const contactList = await findContacts({owner}, "-createdAt -updatedAt", {skip, limit});
    res.json(contactList);
};

module.exports = {getContactList: ctrlWrapper(getContactList)};