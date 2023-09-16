const path = require("node:path");
const config = require("../config/config");
const fs = require("node:fs").promises;

const uploadFile = async (req,res,next) => {
    const { description } = req.body;
    const { path: tempPathName, originalname } = req.file;
    const filename = path.join(config.AVATARS_PATH, originalname);
    try {
        await fs.rename(tempPathName, filename);

    } catch (error) {
        console.log(error); 
    }
    res.json({
      description,
      message: "Plik załadowany pomyślnie",
      status: 200,
    });
}

module.exports = {
  uploadFile,
};