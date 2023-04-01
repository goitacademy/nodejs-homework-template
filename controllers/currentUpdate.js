const imageService = require("../services/imageService")

const currentUpdate = async (req, res, next) => {
    const { file, user } = req
    console.log('req: ', req);
    console.log('file: ', file);
    if (file) {
        const imagePath = await imageService.save(file, { width: 300, height: 300 }, 'images', 'users', user.id)

        // Save the imagePath to the user object
        user.imagePath = imagePath;
    }

    const updatedUser = await user.save()
    
    res.status(200).json({
        contacts: updatedUser
    })
}

module.exports = currentUpdate
