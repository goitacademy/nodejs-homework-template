const path = require('path');
const fs = require('fs/promises');

const {User} = require('../../models/user');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {

const {path: tempUpload, originalname} = req.file;  

try {
const resultUpload = path.join(avatarsDir, originalname);
await fs.rename(tempUpload, resultUpload)
const avatarURL = path.join('public', 'avatars', originalname);
await User.findByIdAndUpdate(req.user._id, {avatarURL});

res.status(200).json({avatarURL});

} catch (error) {
await fs.unlink(tempUpload);
throw error.status(401).json({ message: 'Not authorized' }); 
}
}

module.exports = updateAvatar;