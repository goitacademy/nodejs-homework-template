const fs = require('fs/promises');
const Contact = require('../../models/notices/notises');

const removeNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Notice.findByIdAndRemove(id);
    const NoticesList = await Notice.find();
    if (!item) {
      return res.status(404).json({ "message": "Not found" })
    }
    return res.status(200).json({ "message": "contact deleted", NoticesList });
    } catch (err) {
        res.status(400).json({ message: 'Ooops...'})
    }
}

module.exports = {
    removeNotice
}