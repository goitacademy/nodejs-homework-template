const getAvatarImageFileName = (req, id) => {
	const extention = req.file.originalname.split(".").pop();
	return `${id}.${extention}`;
};

module.exports = getAvatarImageFileName;
