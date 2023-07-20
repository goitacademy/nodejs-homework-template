const fs = require('fs/promises');
const Contact = require('../../models/notices/notises');


const listNotices = async (req, res) => {
  const { _id: owner } = req.user;
    try {
        const { page = 1, limit = 20, favorite = false } = req.query;
        const skip = (page - 1) * limit;
        let panginationString = { owner }
        !favorite ? panginationString = {owner} : panginationString = { owner , favorite };
        const noticesList = await Notice.find( panginationString , "-createdAT -updatedAT", {skip, limit});  
        return res.status(200).json(noticesList);   
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ooops... ListContacts'})
    }
}

module.exports = {
    listNotices
}