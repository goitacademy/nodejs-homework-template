const { BadRequest, NotFound } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models")
const { SECRET_KEY } = process.env;



const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "_id email password subscription token");
   if (!user || !bcrypt.compareSync(password, user.password)) {
throw new BadRequest("Email or password is wrong")
  /*   res.status(401).json({
            Status: "401 Unauthorized",
ResponseBody: {
  "message": "Email or password is wrong"
}

        }) */
       
       
       
       
   
   /*  if (!user) {
        throw new NotFound(`Email ${email} not found`) */


      /*   res.status(404).json({
            status: "error",
            code: 404,
            message: `Email ${email} not found`

        }) */
    }
    /* if (!bcrypt.compareSync(password, user.password)) {
        throw new BadRequest("Invalid password") */



      /*   res.status(400).json({
            status: "error",
            code: 400,
            message: "Invalid password"
        })
        return; */
    /* } */
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
    /*     Status: "200 OK",
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
} */
    })
}


module.exports = login