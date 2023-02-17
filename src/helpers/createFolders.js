const { mkdir } = require("fs/promises");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const AVATARS_DIR = path.join(process.cwd(), process.env.AVATARS_DIR);

async function createUploadDir(path) {
  try {
    if (!fs.existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, {
        recursive: true,
      });
      console.log("UPLOAD_DIR  created successfully");
    } else {
      console.log("UPLOAD_DIR already exists");
    }
  } catch (error) {
    console.log(error);
  }
}

async function createAvatarsDir(path) {
  try {
    if (!fs.existsSync(AVATARS_DIR)) {
      await mkdir(AVATARS_DIR, {
        recursive: true,
      });
      console.log("AVATARS_DIR created successfully");
    } else {
      console.log("AVATARS_DIR already exists");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUploadDir, createAvatarsDir };
