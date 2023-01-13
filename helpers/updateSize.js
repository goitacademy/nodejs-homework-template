const Jimp = require('jimp');
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const updateSizeAvatar = async (req, res) => {
        const { fieldname, filename } = req.file;
    await Jimp.read('filename', (err, fieldname) => {
              if (err) throw err;
            return fieldname
                .resize(250, 250)
                .write('filename'); 
        })
           
}


           
    
module.exports = updateSizeAvatar;