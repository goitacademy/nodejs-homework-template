const { getContactById } = require('../../models/contacts');

const getById = async (req, res, next) => {
    const contactParamsId = req.params.contactId;
    const contact = await getContactById(contactParamsId)

    // console.log(contactParamsId)
    res.status(200).json({ status: "success", data: contact })
}

module.exports = getById;
