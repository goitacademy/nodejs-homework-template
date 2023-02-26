import multer from 'multer';
import path from 'path';
import { ValidationError } from 'helpers/errors';
import { IRequest } from 'types/Request.interface';

const uploadDir = path.resolve(process.cwd(), 'tmp');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req: IRequest, file, cb) => {
    const parsedFile = file.originalname.split('.');
    const newFileName = `${req.user?._id?.toString()}.${parsedFile.at(-1)}`;

    cb(null, newFileName);
  },
});

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const [type] = file.mimetype.split('/');

    if (type !== 'image') {
      return cb(new ValidationError('You can upload only the image file'));
    }

    cb(null, true);
  },
});
