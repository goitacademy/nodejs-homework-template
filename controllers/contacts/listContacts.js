const { Contact } = require('../../models');
const { sendSuccessfulRes } = require('../../helpers');

const listContacts = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    console.log(req.query);
    const skip = (page - 1) * limit;
    const { _id } = req.user;
    const result = await Contact.find({ owner: _id }, '_id name email phone favorite', {skip, limit: +limit});
    sendSuccessfulRes(res, { result });
};

module.exports = listContacts;