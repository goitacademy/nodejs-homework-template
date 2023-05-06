const Jimp = require("jimp");

const cropAvatar = async(w = 256, h = 256, file)=>{
	await Jimp.read(file)

}
Jimp.read("lenna.png")
  .then((lenna) => {
    return lenna
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write("lena-small-bw.jpg"); // save
  })
  .catch((err) => {
    console.error(err);
  });
