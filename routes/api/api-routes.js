const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger/swagger-file.json");

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

module.exports = router;
