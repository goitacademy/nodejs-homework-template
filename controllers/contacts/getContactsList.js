const Contact = require("../../models/contact")

async function getContactsList(req, res, next) {
    try {
    const {_id: owner} = req.user

    const list = await Contact.find({owner}).populate("owner", "email subscription");
    console.log(list);
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = getContactsList

