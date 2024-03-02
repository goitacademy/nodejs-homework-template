const express = require("express");

const ctrl = require("../../controllers/customers");
const {validateBody, isValidId, authenticate} = require("../../middlewares");
const {schemas} = require("../../models/customer");

const router = express.Router();

router.use(authenticate);

router.get("/", ctrl.getAll);
router.get("/:customerId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);
router.put("/:customerId", isValidId, validateBody(schemas.addSchema), ctrl.updateById);
router.patch("/:customerId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:customerId", isValidId, ctrl.deleteById);


module.exports = router;



// upload.fields([{name: "cover", maxCount: 1}, {name: "subcover", maxCount: 2}])
// upload.array("cover", 8)

// CONTROLLER
// const booksDir = path.join(__dirname, "public", "avatars");
//  app.post("api/books", upload.single("cover"), async(req, res) => {
//     const {path: tmpUpload, originalname} = req.file;
//     const resultUpload = path.join(booksDir, originalname)
//     // await fs.rename("./tmp/cover.jpg", "./public/avatars/cover.jpg");
//     await fs.rename(tmpUpload,resultUpload);
//     // const cover = path.join("public", "books", originalname);
//     const cover = path.join("books", originalname);
//     const newBook = {
//         id: nanoid(),
//         ...req.body,
//         cover,
//     }
//     books.push(newBook);

//     res.status(201).json(newBook)

//      console.log(req.body);
//      console.log(req.file);
//  })

