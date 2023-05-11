//import Jimp from "jimp";
var Jimp = require("jimp");

Jimp.read("./temp/dimA.jpg")
  .then((dima) => {
    return dima
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale(90) // set greyscale
      .write("dima-small-bw.jpg"); // save
  })
  .catch((err) => {
    console.error(err);
  });