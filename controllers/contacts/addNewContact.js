const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers/index");


const addNewContact =  async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});

    res.status(201).send(result);
};


module.exports = {
    addNewContact: ctrlWrapper(addNewContact)
};