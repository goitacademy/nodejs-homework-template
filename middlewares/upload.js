import multer from 'multer'
import { nanoid } from 'nanoid'
import path from 'path'

const destination = path.resolve('tmp')

const storage = multer.diskStorage({
  destination,
  filename: (_, file, callback) => {
    const filename = `${nanoid()}_${file.originalname}`
    callback(null, filename)
  },
})

export const upload = multer({ storage })
