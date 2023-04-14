const multer = require('multer');
const uuid = require('uuid');
const fse = require('fs-extra');
const sharp = require('sharp');
const path = require('path');
class ImageService { 
    static upload(name) { 
        const multerStorage = multer.memoryStorage()
        const multerFilter = (req, file, callbackFn) => {
            
            
            if (file.mimetype.startsWith('image/')) {
                callbackFn(null, true);
            } else {
                callbackFn(new Error("Неверный тип файла"), false);
            }
        };
        
       
        return multer({
            storage : multerStorage,
            fileFilter : multerFilter
        }).single(name);
    }

    static async save(file,options, ...pathSegments) {
        const fileName = `${uuid.v4()}.jpeg`;
        
        const fullFilePath = path.join(process.cwd(), 'static', ...pathSegments);
        
        await fse.ensureDir(fullFilePath);
        await sharp(file.buffer)
        .resize(options)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        .toFile(path.join(fullFilePath, fileName))
        return path.join(...pathSegments, fileName)
    }
}

module.exports = ImageService;