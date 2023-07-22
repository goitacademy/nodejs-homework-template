const fs = require('fs/promises');
const Notice = require('../../models/notices/notices');

const getAllNotices = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;
        const listAllNotices = await Notice.find({}, "-createdAT -updatedAT", {skip, limit});
        return res.status(200).json(listAllNotices);   
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}

module.exports = {
    getAllNotices
}