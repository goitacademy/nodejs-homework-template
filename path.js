const path = require('path');

const uploadDestination = path.join(__dirname, 'public', 'avatars');

const uploadTemp = path.join(__dirname, 'temp');

const avatarPath = path.join(__dirname, 'avatars');

module.exports = { uploadDestination, uploadTemp, avatarPath };
