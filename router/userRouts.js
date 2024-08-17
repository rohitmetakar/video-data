const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const verifyToken = require('../auth/middleware')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage })

router.post('/userReg', userController.userRegistration);s

router.post('/login', userController.userLogin)

router.get('/getuser', verifyToken, userController.getUser)

router.post('/uploadUser', upload.single('profile_picture'), verifyToken, userController.uploadUser)

router.post('/uploadVideos', upload.array('videos'), verifyToken, userController.uploadVideos)

router.get('/getuserData', verifyToken, userController.getuserData)

router.get('/videos/:id', verifyToken, userController.getUserDataById)



module.exports = router;