const fs = require('fs/promises');
const Notice = require('../../models/notices/notises');

const getAllNotices = async (req, res) => {
      try {
        const listAllNotices = await Contact.find();
        return res.status(200).json(listAllNotices);   
    } catch (err) {
        res.sendStatus(500);
    }
}

module.exports = {
    getAllNotices
}