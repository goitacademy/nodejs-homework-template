const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const User = require('../../models/users');
const authMiddleware = require('../../middleware/auth');
const { signupSchema, loginSchema } = require('../../models/validation');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { verify } = require('crypto');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashedPswd = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    
    const newUser = new User({
      email,
      password: hashedPswd,
      subscription: 'starter',
      avatarURL: undefined,
      verificationToken,
      verify: false,
    });

    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:  process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from:  process.env.EMAIL_USER,
      to: newUser.email,
      subject: 'E-mail verification',
      html: `<p>Welcome ${newUser.email},</p>
             <p>Thank you for sign up. Click link below, to verify your e-mail:</p>
             <a href="http://localhost:3000/users/verify/${verificationToken}">Verify e-mail</a>`
    };

    //transporter.sendMail( mailOptions, ( error, info) => {
      // if ( error ) {
       // console.error('E-mail error', error);
       // return res.status(500).json({ message: 'Error sending verification email' })
     // } else {
       // console.log('E-mail sent:', info.response);
     // }
   // });

   console.log('Verification token for ${newUser.email}: ${verificationToken}');

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    if (!user.verify) {
      return res.status(401).json({ message: 'Email not verified. Please check your inbox.' }); // Bardziej precyzyjny komunikat
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.use(authMiddleware);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('avatar');

router.patch('/avatars', upload, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const { _id } = req.user;
    const avatarPath = path.join(__dirname, '../../', 'tmp', req.file.filename);

    const avatar = await jimp.read(avatarPath);
    await avatar.resize(250, 250);
    const publicDir = path.resolve(__dirname, '../../', 'public', 'avatars');
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const avatarFilename = `${_id}-${req.file.filename}`;
    const avatarSavePath = path.join(publicDir, avatarFilename);

    await avatar.write(avatarSavePath);

    const avatarURL = `/avatars/${avatarFilename}`;
    await User.findByIdAndUpdate(_id, { avatarURL });

    fs.unlinkSync(avatarPath);

    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/users/verify/:verificationToken', async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({  verificationToken });

    if ( !user ) {
      return res.status(404).json({ message: 'User not found '});
    }

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    res.status(200).json({  message: 'Verification successful' });
  } catch ( error ) {
    console.error('Verification error', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/users/verify', async (req, res) => {
  const { email } = req.body;

  if ( !email ) {
    return res.status(400).json({ message: 'Fill all the required fields' });
  }

  try {
    const user = await User.findOne({ email });

    if ( !user ) {
      return res.status(404).json({ message: 'User not found' });
    }

    if ( user.verify ) {
      return res.status(400).json({ message: 'Verification has already been passed'});
    }

    const verificationToken = user.verificationToken;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:  process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from:  process.env.EMAIL_USER,
      to: user.email,
      subject: 'E-mail verification',
      html: `<p>Welcome ${user.email},</p>
             <p>Thank you for sign up. Click link below, to verify your e-mail:</p>
             <a href="http://localhost:3000/users/verify/${verificationToken}">Verify e-mail</a>`
    };

    transporter.sendMail( mailOptions, ( error, info) => {
      if ( error ) {
        console.error('E-mail error', error);
        return res.status(500).json({ message: 'Error sending verification email' })
      } else {
        console.log('E-mail sent:', info.response);
        return res.status(200).json({ message: 'Verification email sent'});
      } 
    });
      
    
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
