const Jimp = require("jimp");
const { findUserByToken } = require("../../models/users");

const avatars = async(req, res, next) => {
    console.log(req.file);
    let token = req.headers.authorization.split(' ')[1];
    console.log(token);
    let user = await findUserByToken(token);
    
    if (!user) {
        return res.status(401).json({
            status: 'Error',
            code: 200,
            message: 'Unauthorized',
        });
    }
    Jimp.read(req.file.path)
    .then((file) => {
        return file
        .resize(250, 250)
        .write(`public\\avatars\\${user.email}.jpg`);
    })  .catch((err) => {
        console.error(err);
      });

    res.status(200).json({
        status: 'Success',
        code: 200,
        message: 'Success',
    })
}

module.exports={avatars}