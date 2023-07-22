const fs = require('fs/promises');
const Notice = require('../../models/notices/notices');

const getNoticeById = async (req, res) => {

  try {
    const { id } = req.params;
    const item = await Notice.findById(id);
    if (!item) {
      return res.status(404).json({ "message": "Not found" })
    }
    return res.status(200).json(item);
    } catch (err) {
    res.status(400).json({ message: 'Ooops...'})
    }
}


module.exports = {
    getNoticeById
}
