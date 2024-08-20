import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)

    }
  })
  
export  const upload = multer({ storage: storage })

// ye function whatever files jo post request se aa rhi hai unhe
// store krega temporary server storage mei

