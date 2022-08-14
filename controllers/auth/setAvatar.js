const path = require("path");
const fs = require("fs/promises");
const Jimp = require('jimp');


const { basedir } = global;

const { User, schemas } = require(`${basedir}/models/user`);



const avatarsDir = path.join(basedir, "public", "avatars");

async function resize() {
    // Reading Image
    const image = await Jimp.read
    (`${basedir}/public/avatars/62e95b046fc0797608f8787a.jpg`);
    // Used RESIZE_BEZIER as cb for finer images
    image.resize(250,250,Jimp.RESIZE_BEZIER, function(err){
       if (err) throw err;
    })
    .write(`${basedir}/public/avatars/cover.jpg`);
 }
 
 resize();
 console.log("Image is processed successfully");

const setAvatar = async(req, res) => {
    try {
        const { _id } = req.user;

        //Беремо шлях аватарки де вона зараз знаходиться
    const { path: tempPath, originalname } = req.file;

     
    //Уникальне им'я має бути
    const [extension] = originalname.split(".").reverse();

    //Нове імя
    const newName = `${_id}.${extension}`;

    //Перемищуемо її
    const uploadPath = path.join(avatarsDir, newName);

    await fs.rename(tempPath, uploadPath);

        //Запомятовуемо цей шлях
    const avatarURL = path.join("avatars", newName);

        //Записуемо в базу 
    await User.findByIdAndUpdate(_id, {avatarURL, });

        //Повертаємо
    res.json({
        avatarURL,
    })
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }

    
    
}

module.exports = setAvatar;