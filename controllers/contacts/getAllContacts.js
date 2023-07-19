const { Contact } = require('../../models/contact')
const { ctrlWrapper } = require('../../helpers');

// Отримання усіх контактів
const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query; // параметри пагінації у запиті
    const { favorite } = req.query; // параметр favorite у запиті
    const skip = (page - 1) * limit; // скільки данних треба пропустити від початку (у mongoose skip замість page)
    const result = await Contact.find({ owner, favorite }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription");
    res.json(result);
}

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
}