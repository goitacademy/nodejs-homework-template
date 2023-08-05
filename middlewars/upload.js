import multer from 'multer';
import path from 'path';

const destination = path.resolve('temp');

const storage = multer.diskStorage({
  destination,
  filename: function (req, file, cb) {
    // console.log(req.user);
    // const { _id } = req.user;
    // console.log(_id);
    const filename = `${file.originalname}`;
    cb(null, filename);
  },
});
// ${_id}_

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({ storage, limits });

export default upload;
