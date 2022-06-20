
const Jimp = require('jimp');

function resize(req, res, next) {
    const { path, originalname } = req.file;
    console.log(path);
    Jimp.read(path).then(image => {
        console.log('resize image');
        image.resize(250, 250).write(originalname)
        
    })
        .catch(err => {
            throw err
        });
    next();
}


module.exports = resize;