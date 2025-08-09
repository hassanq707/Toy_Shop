const express = require("express");
const { addToy, listToy, removeToy, updateToy } = require('../controllers/toyController');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'toyImages',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), addToy);
router.post('/update', upload.single('image'), updateToy);
router.get('/list', listToy);
router.post('/remove', removeToy);

module.exports = router;
