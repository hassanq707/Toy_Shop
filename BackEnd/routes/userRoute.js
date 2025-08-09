const express = require('express');
const { loginUser, registerUser, saveProfile ,getProfile} = require('../controllers/userController');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const upload = require('../config/multer');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/profile', authMiddleware, upload.single("profile"), saveProfile);
router.get('/getprofile', authMiddleware , getProfile);

module.exports = router;
