const express = require('express')
const logger = require('morgan')
const cors = require('cors')
 /* const multer = require("multer")
const path = require("path") */
const { v4 } = require("uuid")
const fs = require("fs/promises")


/* const tempDir = path.join(__dirname, "temp")
const uploadDir = path.join(__dirname, "public")


const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048
  }
})

const uploadMiddleWare = multer({
  storage: uploadConfig
})
 */
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

/* gravatar.url(email); */

/* app.post("/api/users", uploadMiddleWare.single("image"), async (req, res) => {
  console.log(req.body)
  console.log(req.file)
}) */


/* const avatars = []
 
app.post("/api/users", uploadMiddleWare.single("avatar"), async(req, res) => {

  const { originalname, path: tempName } = req.file;
  const fileName = path.join(uploadDir, "avatars", originalname);

  try {
    await fs.rename(tempName, fileName)
    const avatar = path.join("/avatars", originalname)
   const newUser = { ...req.body, id: v4(), avatar };
  users.push(newUser);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newUser
    }
  })
  } catch(error) {
    await fs.unlink(tempName)
  }  
}) */


/* app.get("/api/users", async (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      users
    }
  })
})
 */
 


const contactsRouter = require('./routes/api/contacts');
const authRouter = require("./routes/api/users")
const { users } = require('./controllers')


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
/* app.use(cors())
app.use(express.json()) */


/* app.use(express.static("public")) */



/* app.use("api/v1/auth", authRouter) */
app.use("/api/users", authRouter)
// app.use("/api/owners", ordersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: 'Not found'
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    status: "error",
    code: status,
    // message: "jhhf"
  })
})

module.exports = app
