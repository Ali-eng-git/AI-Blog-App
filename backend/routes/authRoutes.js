const express = require('express');
const {registerUser,loginUser,getUserProfile} = require('../controllers/authController.js')
const {protect} = require('../middlewares/authMiddleware.js')
const upload = require('../middlewares/uploadMiddleware.js');

const router = express.Router()

//Auth routes
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',protect,getUserProfile);

//Image upload 
router.post('/upload-image',upload.single('image'),(req,res)=>{
    if (!req.file) {
        return res.status(400).json({message:"No file Uploaded"})
    }
    const imageUrl =`${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageUrl});
})

module.exports = router