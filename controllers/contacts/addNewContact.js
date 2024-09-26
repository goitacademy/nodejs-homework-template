const ctrlWrapper = require("../../utils/ctrlWrapper");

const {
    addContact
  } = require("../../services/contactServices");


const addNewContact = async (req, res) => {
    const {_id: owner} = req.user;
    await addContact({...req.body, owner});
  
    res.status(201).json({
      message: `New contact '${req.body.name}' successfuly added to your contacts`,
    });
};

module.exports = {addNewContact: ctrlWrapper(addNewContact)};