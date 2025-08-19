const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

const uploadToCloudinary = async (req, res, next) => {
  try {
    let files = [];

    if (req.file) {
      // Single file
      files = [req.file];
    } else if (req.files && Array.isArray(req.files)) {
      // Multiple files
      files = req.files;
    } else {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedImages = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "my_uploads",
      });

      uploadedImages.push(result.secure_url);
      fs.unlinkSync(file.path); // delete local file after upload
    }

    req.cloudinaryImages = uploadedImages; // always an array
    next();
  } catch (err) {
    console.error("Cloudinary upload failed", err);
    res.status(500).json({ error: "Cloudinary upload failed" });
  }
};

module.exports = { upload, uploadToCloudinary };
