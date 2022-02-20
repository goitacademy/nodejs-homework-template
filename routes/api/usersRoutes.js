const router = express.Router()
const userModel = require('../../model/User');
const jwt = require('jsonwebtoken')
const passport = require('passport')
const secret = process.env.JWT_SECRET
const gravatar = require('gravatar');

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const uploadDir = path.join(__dirname, '../../upload/avatars')
const publicDir = path.join(__dirname, '../../public/avatars')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const newFilename = `${new Date().getTime()}_${file.originalname}`;
    cb(null, newFilename)
  },
})

const upload = multer({
  storage: storage,
})

router.patch('/avatars', upload.single('thumbnail'), async (req, res) => {
  try {
    const { path: temporaryName, originalname } = req.file;
    const fileName = path.join(publicDir, originalname)
    try{
      await fs.rename(temporaryName, fileName);
    } catch(err){
      await fs.unlink(temporaryName);
      console.log(err);
      res.status(500).send(err);
    }
    // Перемістіть файл з папки завантажень до папки thumbnails
    const newShow = await Show.create({
      title: req.body.title,
      description: req.body.description,
      releasedAt: req.body.releasedAt,
      thumbnailUrl: req.file.filename, // Назва файлу
    });

    res.json(newShow);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


const auth = require('../../middlewares/auth');

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body
  const user = await userModel.findOne({ email })
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    })
  }
  try {
    const newUser = new userModel({ email, password })
    const avatar = gravatar.url(email);

    newUser.avatarURL = avatar;
    newUser.setPassword(password)
    await newUser.save()
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        message: 'Registration successful',
        user: {
            email: newUser.email,
            subscription: newUser.subscription
          },
        
      },
    })
  } catch (error) {
    next(error)
  }
})


router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  const user = await userModel.findOne({ email })

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Incorrect login or password',
      data: 'Bad request',
    })
  }

  const payload = {
    id: user.id,
    username: user.username,
  }

  const token = jwt.sign(payload, secret, { expiresIn: '1h' })
  user.token = token
  user.save()
  console.log(user)
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  })
})

router.get('/list', auth, (req, res, next) => {
  const { email } = req.user
  res.json({
    status: 'success',
    code: 200,
    data: {
      message: `Authorization was successful: ${email}`,
    },
  })
})

// router.get('/logout', auth, (req, res, next) => {
//   console.log(req.user)
//   req.user.token = null;
//   req.user.save();

//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       Authorization: `Bearer ${token}}`,
//     },
//   })
// })


router.get('/current', auth, (req, res, next) => {
  const { email, subscription } = req.user
  res.json({
    status: 'success',
    code: 200,
    data: {
      email: email,
      subscription: subscription
    },
  })
})

module.exports = router
