// const {ctrlWrapper } = require("../../helpers");
const {Contact} = require("../../models/contact");


const getAllContact = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
    console.log(result);
};

// module.exports = {getAllContact: ctrlWrapper(getAllContact)}


module.exports = getAllContact