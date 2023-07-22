const fs = require('fs/promises');
const User = require('../../models/users/users');
const Notice = require('../../models/notices/notices');


const addFavorites = async (req, res) => {
    const { id } = req.params;
    try {
        const favNotice = await Notice.findById(id);
        if (!favNotice) {
            return res.status(404).json({message: 'Not found'});
        }
        const newUser = await User.findByIdAndUpdate(req.user._id, { $push: { favorites: favNotice } }, { new: true });
        return res.status(200).json(newUser.favorites);   
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ooops... ListContacts'})
    }
}

const removeFavorites = async (req, res) => {
    const { id } = req.params;
    try {
        const favNotice = await Notice.findById(id);
        if (!favNotice) {
            return res.status(404).json({message: 'Not found'});
        }
        const newUser = await User.findByIdAndUpdate(req.user._id, { $pull: { favorites: favNotice } });
        return res.status(200).json(newUser.favorites); 
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ooops... ListContacts'})
    }
}

const getFavorites = async (req, res) => {
    const { id } = req.user;
    try {
        const newUser = await User.findById(req.user._id);  
        return res.status(200).json(newUser.favorites);   
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ooops... ListContacts'})
    }
}

module.exports = {
    addFavorites,
    removeFavorites,
    getFavorites
}