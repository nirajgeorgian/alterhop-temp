import path from 'path'
import fs from 'fs'
import Busboy from 'busboy'
import multer from 'multer'

const uploadPath = path.resolve(__dirname, '..', 'uploads', 'audio')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    const fileNameArray = file.originalname.split(".")
    const ext = fileNameArray[fileNameArray.length - 1]
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
  }
})
// limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }
const upload = multer({ storage: storage}).single('track')

export const fileUpload = async (req, res) => {
  console.log("file uploading start ...");
  upload(req, res, (err) => {
    // if (err) {
    //   return res.status(400).json({ message: "Upload Request Validation Failed" });
    // } else if(!req.body.name) {
    //   return res.status(400).json({ message: "No track name in request body" });
    // }
    if(err) {
      console.log(err)
      return res.status(401).send("upload failed")
    }
    console.log(req.file);
    return res.end("File uploaded sucessfully!.")
  })
  console.log(req.file)
}
