const { BadRequest, NotFound } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models")
const { SECRET_KEY } = process.env;
const gravatar = require('gravatar');

const url = gravatar.url('emerleite@gmail.com');



const login = async (req, res) => {
    const { email, password, avatar } = req.body;
    const user = await User.findOne({ email }, "_id email password subscription token");
   if (!user || !bcrypt.compareSync(password, user.password)) {
throw new BadRequest("Email or password is wrong")
  
    }
   
  const { _id } = user;
    const payload = {
        _id
    }

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, {token})
    res.json({
        status: "success",
        code: 200,
        data: {
            token
        }
    })
}


module.exports = login