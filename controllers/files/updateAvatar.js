// const { fs, writeFile, readFile } = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../service");
const RequestError = require("../../helpers/RequestError");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const nameAvatar = req.file.filename;
  // const originalNameAvatar = req.file.originalname;

  const avatarPath = path.resolve(`tmp/${nameAvatar}`);

  Jimp.read(avatarPath, (err, filename) => {
    // console.log(filename);
    if (err) {
      throw RequestError(404, `${err.message}`);
    }
    return filename.resize(250, 250);
    // resize
    // .quality(60) // set JPEG quality
    // .greyscale() // set greyscale
    // .write("lena-small-bw.jpg"); // save
  });

  const [_, extension] = req.file.originalname.split(".");
  req.file.originalname = `${_id}.${extension}`;
  // console.log(req.file);

  // await fs.writeFile(contactsPath, JSON.stringify(newArray), "utf8");
  // const newData = await fs.readFile(contactsPath, "utf8");
  // console.log(JSON.parse(newData));
  // const { avatarURL } = req.body;

  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL: req.file.originalname },
    { new: true }
  );
  if (!result) {
    throw RequestError(404, `Not found contact id: ${_id}`);
  } else {
    res.status(200).json({
      code: 200,
      status: "success",
      avatarURL: result.avatarURL,
    });
  }
};
module.exports = updateAvatar;
