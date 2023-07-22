const fs = require('fs/promises');
const Notice = require('../../models/notices/notices');


const filterNotices = async (req, res) => {
    const { sex, category } = req.query;
    console.log(sex, category)
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;
        let panginationString = {sex}
        category ? panginationString = {category, sex} : panginationString = { sex };
        const noticesList = await Notice.find( panginationString , "-createdAT -updatedAT", {skip, limit});  
        return res.status(200).json(noticesList);   
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ooops... ListContacts'})
    }
}

module.exports = {
    filterNotices
}