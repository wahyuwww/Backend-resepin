const createHttpError = require('http-errors')
const multer = require('multer')
const path = require('path')
// const commonHellper = require('../helpers/common')
// const cloudinary = require('../helper/cloudinary')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/video')
  },
  filename: (req, file, cb) => {
    const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`
    cb(null, nameFormat)
  }
})
// const limits = {
//   fileSize: 2 * 1000 * 1000
// }

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|png|mp4/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  if (extname) {
    cb(null, true)
  } else {
    return cb(createHttpError('File extension must be PNG or JPG'), false)
  }
  const limits = parseInt(req.headers['content-length'])
  console.log(limits)
  // console.log(limits)
  if (limits > 30 * 1000 * 1000) {
    cb(createHttpError('sorry data max 2 Mb'))
  }
}

const upload = multer({
  storage,
  fileFilter
})
const uploadMultiple = upload.fields([
  { name: 'video', maxCount: 10 },
  { name: 'image', maxCount: 10 }
])
const uploadVideo = {
  multipleUpload: (req, res, next) => {
    // const multipleUpload = upload.fields([
    //   { name: 'video', maxCount: 10 },
    //   { name: 'image', maxCount: 10 }
    // ])
    uploadMultiple(req, res, async (err) => {
      if (err) {
        res.json({
          message: err.message
        })
      } else {
        try {
          //   const image = req.files.map((file) => {
          //     return `http://${req.get('host')}/img/${file.filename}`
          //   })
        } catch {
          console.log(err)
          // return commonHellper.response(res, null, err.message, 400)
        } finally {
          next()
        }
      }
    })
  }
}
const uploadImg = {
  singleUpload: (req, res, next) => {
    const singleUpload = upload.single('image')
    singleUpload(req, res, (err) => {
      if (err) {
        res.json({
          message: err.message
        })
      } else {
        try {
          req.body.image = req.file.filename
        } catch {
          console.log(err)
          // return commonHellper.response(res, null, err.message, 400)
        } finally {
          next()
        }
      }
    })
  }
}

module.exports = {
  uploadImg,
  uploadVideo,
  uploadMultiple
}
