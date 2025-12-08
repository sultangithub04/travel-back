// import multer from "multer"
// import path from "path"
// import { v2 as cloudinary } from "cloudinary"
// import config from "../../config"

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(process.cwd(), "./upload"))
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const upload = multer({ storage: storage })

// const uploadToCludinary = async (file: Express.Multer.File) => {
//     cloudinary.config({
//         cloud_name: config.cloudinary.cloud_name,
//         api_key: config.cloudinary.api_key,
//         api_secret: config.cloudinary.api_secret
//     });
//     const uploadResult = await cloudinary.uploader
//         .upload(
//             file.path, {
//             public_id: file.fieldname,
//         }
//         )
//         .catch((error) => {
//             console.log(error);
//         });
//     return uploadResult
// }
// export const fileUploader = {
//     upload, uploadToCludinary
// }

import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import config from "../../config";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "./upload"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const finalName = `${name}-${uniqueSuffix}${ext}`;

    cb(null, finalName);
  },
});

const upload = multer({ storage: storage });

const uploadToCludinary = async (file: Express.Multer.File) => {
  cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
  });

  // extract filename without extension
  const originalName = file.filename.split(".")[0];

  const uploadResult = await cloudinary.uploader.upload(file.path, {
    public_id: originalName, // SAFE UNIQUE FILENAME
    folder: "uploads", // optional
    use_filename: true, // keeps filename
    unique_filename: false, // will not override public_id format
  });

  return uploadResult;
};

export const fileUploader = {
  upload,
  uploadToCludinary,
};
