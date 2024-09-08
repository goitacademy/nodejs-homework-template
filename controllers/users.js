const User = require("../models/userSchema");
const service = require("../service");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const jimp = require("jimp");
const path = require("path");
const { main } = require("../controllers/email.js");
const { v4: uuidv4 } = require("uuid");

const schemaLogin = Joi.object({
    password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{10,20}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pl'] } }).required(),
    subscription: Joi.string().valid("starter", "pro", "business").default("starter"),
    token: Joi.string().default(null),
  });

const register = async (req, res, next) => {
try {
  const  body = schemaLogin.validate(req.body);
  const { email, password } = req.body;
    if (body.error) {
      return res.status(400).json({ error: body.error.details[0].message });
    }
    else {
        const user = await User.findOne({ email }).lean();

        if (user) {
            return res.status(409).json({ message: 'This email is already taken' });
        }

        const url = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, true);
        const verificationToken = uuidv4();
        const subject="Registration";
        const html = `http://localhost:3000/api/users/verify/${verificationToken}`;
        
        const newUser = new User({
        email,
        avatarURL: url,
        verificationToken,
      });
        await newUser.setPassword(password);
        await newUser.save();
        try {
            await main( email, subject, html );
          } catch (error) {
            console.log(error);
            return next(error);
          }

      return res.status(201).json(
        {
          "user": {
            "email": email,
            "subscription": "starter",
            "avatar": newUser.avatarURL,
            "verificationToken": newUser.verificationToken,
            }
        });
    }} catch (error) {
        next(error);
    };
};

const login = async (req, res, next) => {
try {
    const  body = schemaLogin.validate(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (body.error) {
      return res.status(400).json({ error: body.error.details[0].message });
      };
    
    if (!user){
      return res.status(401).json({message: "User not found"});
    };
  
    const isPasswordCorrect = await user.validatePassword(password);
  
    if (isPasswordCorrect) {
      const payload = { id: user._id,};
      const token = jwt.sign(
        payload,
        process.env.SECRET,
        {expiresIn: '12h'}
      );
  
      await user.setToken(token);
      await user.save();
  
      return res.json({token});
    } else {
      return res.status(401).json({message: "Wrong password"});
    }
  } catch (error) {
    next(error);
};
};

const logout = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      user.token = null;
      await user.save();
      console.log("Logged out")
      return res.status(204).send();
      
    } catch (error) {
      next(error);
    }
  };
    
  const current = async (req, res, next) => {
    try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.status(200).json({ email: user.email, subscription: user.subscription });
    } else {
      return res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    next(error);
}
  };

  const updateAvatar = async (req, res, next) => {
    try {
    if (!req.file) {
         return res.status(400).json({message:'File is not an image'});
   }
   const avatarName = req.file.filename
   const temp = path.join(process.cwd(), './public/temp');
   const image = path.join(temp, avatarName);
   const storage = path.join(process.cwd(), './public/avatars');
   const avatarsPath = path.join(storage, avatarName);
   const MAX_AVATAR_WIDTH = 500;
   const MAX_AVATAR_HEIGHT = 500;
 
   jimp.read(image, async(error, image) => {
   if (error) throw error;
   try {
   const w = image.getWidth();
   const h = image.getHeight();
   
           const cropWidth = w > MAX_AVATAR_WIDTH ? MAX_AVATAR_WIDTH : w;
           const cropHeight = h > MAX_AVATAR_HEIGHT ? MAX_AVATAR_HEIGHT : h;
   
           const centerX = Math.round(w / 2 - cropWidth / 2);
           const centerY = Math.round(h / 2 - cropHeight / 2);
     image
     .rotate(360)
     .crop(
        centerX < 0 ? 0 : centerX,
        centerY < 0 ? 0 : centerY,
        cropWidth,
        cropHeight
        )
        .cover(250,250)
        .greyscale()
        .write(avatarsPath);}
        
    catch (error) {
    console.error(error);
    next(error);}
 });
   const newAvatarURL = `${storage}/${avatarName}`;
   const user = await service.updateUser(req.user._id, {avatarURL: newAvatarURL} );
 
     if (!user) {
       res.status(404).json({ message: "User not found" });
     } else {
       res.status(200).json({message: `${newAvatarURL}`});
     }
   } catch (error) {
     console.error(error);
     next(error);
   }
 };

 const verification = async (req, res, next) => {
    try {
      const { verificationToken } = req.params;
      const user = await User.findOne({ verificationToken });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.verify = true;
      user.verificationToken = null;
      await user.save();
  
      return res.status(200).json({ message: "Verification successful" });
    } catch (error) {
        console.error(error);
        next(error);
    }
  };
  const resendEmail = async (req, res, next) => {
    try {
      const { email} = req.body
      const user = await User.findOne({ email })
      if (!user) { res.status(404).json(`User not found`)}
      
      else if (!user.verify) {
        const subject="reverification process"
        const html = `http://localhost:3000/api/users/verify/${user.verificationToken}`
        main(email,subject, html)
        res.json({message:'verification email sent'})

      }
      else {
        res.status(400)
          .json(`Verification has already been passed`)
      }
    }
    catch (error) {
      console.error(error);
      next(error);
    }
  }

module.exports = {
  register,
  login,
  logout,
  current,
  updateAvatar,
  verification,
  resendEmail,
};