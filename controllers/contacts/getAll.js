const { Contact } = require("../../models/contact")

const getAll = async (req, res) => {
    // const result = await Contact.find({}, "name");
    const result = await Contact.find();
    // console.log(result);
    res.json(result);
}
module.exports = getAll