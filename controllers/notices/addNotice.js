const fs = require('fs/promises');
const Notice = require('../../models/notices/notises');


const addNotice = async (req, res) => {  
  const { _id: owner } = req.user;
  try {
    const item = await Notice.create({...req.body, owner});
    return res.status(201).json({ message: 'Notice is added', item });
  }
  catch (err) {
        res.status(405).json({ message: 'Ooops...'})
    }
}

module.exports = {
  addNotice
}